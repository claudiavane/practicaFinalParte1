const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let CarSchema = new Schema({
    nit: {
        type: String,
        required: [true, 'nit is required']
    },
    name: {
        type: String,
        required: [true, 'name is required']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    state: {
        type: Boolean,
        default: true
    },
    books: [
        {
            bookId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Book',
                required: [true, 'book is required']
            },
            cantidad: {
                type: Number,
                required: [ true, 'cantidad is required'],
            }
        }
    ],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'user is required']
    }
});

module.exports = mongoose.model('Car', CarSchema);
