const express = require('express');
//const Chat = require('../models/chat');
const router = express.Router();
const handleUserRequest = require('../controllers/queryGen');
const aiResponse = require('../controllers/aiResponse');
const { queryFunction } = require('../connect');
const Chat = require('../models/chat');

router.post('/chat/:roomId', async (req, res) => {
    const userQuery = req.body.query;
    const roomId = req.params.roomId;
    const isRoomExists = await Chat.findOne({ roomId: roomId });
    try {
        // if (!isRoomExists) {
        //     return res.status(404).json({ error: 'Chat room not found' });
        // }
        const generatedQuery = await handleUserRequest(userQuery);
        console.log("Generated Query:", generatedQuery);
        if (generatedQuery.message.length > 10) {
            const finalResponse = {
                mainOutput: generatedQuery.message,
            }
            res.json({ finalResponse, roomId });
        }
        const sqlResult = await queryFunction(generatedQuery);
        console.log("mysqldb output:", sqlResult);
        const finalResponse = await aiResponse(userQuery, sqlResult);
        console.log("AI Response:", finalResponse);
        console.log(`Processing message in room: ${roomId}`);

        const chat = await Chat.create({
            roomId: roomId,
            userQuery: userQuery,
            genQuery: generatedQuery,
            sqlResult: sqlResult,
            aiResponse: finalResponse
        });

        res.json({ finalResponse, roomId });
    } catch (error) {
        console.error('❌ Error in /api/chat/:roomId:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/chat/:roomId', async (req, res) => {
    const roomId = req.params.roomId;
    console.log(`GET request for room: ${roomId}`);
    try {
        const roomId = req.params.roomId;
        console.log(`GET request for room: ${roomId}`);

        const chats = await Chat.find({ roomId: roomId }).sort({ createdAt: 1 });

        if (!chats || chats.length === 0) {
            return res.status(200).json({ message: 'Hit mic button to communicate with database' });
        }

        // Format the conversation history for the frontend
        const messages = [];

        // Process all messages in the room to create a conversation history
        for (const chat of chats) {
            // Add user message
            messages.push({
                text: chat.userQuery,
                sender: "user",
                timestamp: chat.createdAt ? new Date(chat.createdAt).toLocaleTimeString() : new Date().toLocaleTimeString()
            });

            // Add AI response
            if (chat.aiResponse && chat.aiResponse.mainOutput) {
                messages.push({
                    text: chat.aiResponse.mainOutput,
                    sender: "ai",
                    timestamp: chat.createdAt ? new Date(chat.createdAt).toLocaleTimeString() : new Date().toLocaleTimeString()
                });
            } else if (chat.aiResponse) {
                messages.push({
                    text: chat.aiResponse,
                    sender: "ai",
                    timestamp: chat.createdAt ? new Date(chat.createdAt).toLocaleTimeString() : new Date().toLocaleTimeString()
                });
            }
        }
        const resp = {
            messages,
            userQuery: chats[0].userQuery,
            aiResponse: chats[0].aiResponse
        };
        console.log(resp);
        // Return both formats for compatibility
        res.json({
            messages,
            userQuery: chats[0].userQuery,
            aiResponse: chats[0].aiResponse
        });
    } catch (error) {
        console.error('❌ Error in GET /api/chat/:roomId:', error);
        res.status(500).json({ error: 'Failed to retrieve chat history' });
    }
})





module.exports = router;
