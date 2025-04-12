const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { nanoid } = require('nanoid');

const handleUserRequest = require('./controllers/queryGen');
const aiResponse = require('./controllers/aiResponse');
const { queryFunction } = require('./connect');
const userRoutes = require('./routes/user');
const Chat = require('./models/chat');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('uploads'));

// Routes
app.post('/api/chat/:roomId', async (req, res) => {
    try {
        const userQuery = req.body.query;
        const roomId = req.params.roomId;
        const isRoomExists = await Chat.findOne({ roomId: roomId });

        if (!isRoomExists) {
            return res.status(404).json({ error: 'Chat room not found' });
        }

        const generatedQuery = await handleUserRequest(userQuery);
        console.log("Generated Query:", generatedQuery);
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

app.post('/api/chat', async (req, res) => {
    try {
        const userQuery = req.body.query;
        const generatedQuery = await handleUserRequest(userQuery);
        const sqlResult = await queryFunction(generatedQuery);
        const finalResponse = await aiResponse(userQuery, sqlResult);
        const roomId = nanoid(8);

        console.log(`Created new room with ID: ${roomId}`);

        const chat = await Chat.create({
            roomId: roomId,
            userQuery: userQuery,
            genQuery: generatedQuery,
            sqlResult: sqlResult,
            aiResponse: finalResponse
        });

        res.json({ finalResponse, roomId });
    } catch (error) {
        console.error('❌ Error in /api/chat:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/chat/:roomId', async (req, res) => {
    try {
        const roomId = req.params.roomId;
        console.log(`GET request for room: ${roomId}`);

        const chats = await Chat.find({ roomId: roomId }).sort({ createdAt: 1 });

        if (!chats || chats.length === 0) {
            return res.status(404).json({ error: 'Chat not found' });
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
});

app.use('/user', userRoutes);

app.get('/', (req, res) => {
    res.send('👋 Welcome to the API!');
});

// Start Server
app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});