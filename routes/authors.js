const express = require('express');
const _ = require('lodash');

const Author = require('../models/author');
const { verifyToken, verifyRole } = require('../middlewares/auth');
const app = express();

app.get('/authors/:authorId', (req, res) => {
    let authorId = req.params.authorId;
    Author.findOne({ _id: authorId}, (err, authorDB) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            author: authorDB
        })
    })
})

app.post('/authors', [verifyToken, verifyRole], (req, res) => {
    let body = req.body;

    let author = new Author({
        name: body.name,
        age: body.age,
        nationality: body.nationality,
        userId: body.userId
    });

    author.save((err, authorDB) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        return res.status(201).json({
            ok: true,
            author: authorDB
        });
    });
});

module.exports = app;
