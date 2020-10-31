const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let BookSchema = new Schema({
    title: {
        type: String,
        required: [true, 'title is required']
    },
    description: {
        type: String,
        required: [true, 'description is required']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    price: {
        type: String,
    },
    state: {
        type: Boolean,
        default: true
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: [true, 'author is required']
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'user is required']
    }
});

module.exports = mongoose.model('Book', BookSchema);
