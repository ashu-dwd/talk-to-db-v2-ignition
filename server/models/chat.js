const mongoose = require('mongoose');
const { Schema } = mongoose;
const { Mixed } = Schema.Types;

const chatSchema = new Schema({
    userQuery: String,
    roomId: String,
    genQuery: { type: Mixed },     // allow object
    sqlResult: { type: Mixed },    // allow array/object
    aiResponse: { type: Mixed },   // allow object
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('Chat', chatSchema);
