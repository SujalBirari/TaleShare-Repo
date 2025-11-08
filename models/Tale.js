const mongoose = require('mongoose');

const TaleSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        title: {
            type: String,
            required: true,
            default: 'Untitled Tale'
        },
        content: {
            type: String,
            required: true
        },
        createdDate: {
            type: Date,
            default: Date.now
        }
    }
);

module.exports = mongoose.model('Tale', TaleSchema);