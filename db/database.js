const mongoose = require('mongoose');
const q = require('q');

const { DB_URL, DB_PORT, DATABASE, DB_USERNAME, DB_PASSWORD } = require('../config/config');

mongoose.Promise = q.Promise;

let db;
if(!DB_USERNAME && !DB_PASSWORD) {
    db = mongoose.connect(`mongodb://${DB_URL}:${DB_PORT}/${DATABASE}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
} else {
    db = mongoose.connect(`mongodb://${DB_URL}:${DB_PORT}/${DATABASE}`, {
        user: DB_USERNAME,
        pass: DB_PASSWORD,
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}


module.exports = db;
