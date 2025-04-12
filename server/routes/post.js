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
        if (!isRoomExists) {
            return res.status(404).json({ error: 'Chat room not found' });
        }
        const generatedQuery = await handleUserRequest(userQuery);
        console.log("Generated Query:", generatedQuery);
        try {
            const sqlResult = await queryFunction(generatedQuery);
            console.log("mysqldb output:", sqlResult);
        } catch (error) {
            const finalResponse = {
                mainOutput: generatedQuery.message,
                success: false
            };
            res.json({ finalResponse, roomId });
        }
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



module.exports = router;