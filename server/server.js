const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const handleUserRequest = require('./controllers/queryGen');
const aiResponse = require('./controllers/aiResponse');
const { queryFunction } = require('./connect');
const userRoutes = require('./routes/user');
const Chat = require('./models/chat');


dotenv.config();


const app = express();

const PORT = process.env.PORT || 5000;

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
app.use('/api', require('./routes/api'));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
