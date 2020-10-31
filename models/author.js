const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let AuthorSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    age: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    nationality: {
        type: String
    },
    state: {
        type: Boolean,
        default: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'user is required']
    }
});

module.exports = mongoose.model('Author', AuthorSchema);
