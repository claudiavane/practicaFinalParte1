const express = require('express');
const _ = require('lodash');

const Book = require('../models/book');
const { verifyToken, verifyRole } = require('../middlewares/auth');
const app = express();

app.get('/books/:bookId', (req, res) => {
    let bookId = req.params.bookId;
    Book.findOne({ _id: bookId}, (err, bookDB) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            book: bookDB
        })
    })
});

app.get('/books', [verifyToken, verifyRole], (req, res) => {
    let from  = req.query.from || 0;
    from = Number(from);
    let limit = req.query.limit || 5;
    limit = Number(limit);
    let defaultFilters = {
        state: true
    }
    
    Book.find(defaultFilters, 'title description')
    .skip(from)
    .limit(limit)
    .exec((err, books) => {
        if(err) {
            return res.status(400).json({
                ok:false,
                message: err
            })
        }
        Book.find(defaultFilters).count((err, count) => {
            if(err) {
                return res.status(400).json({
                    ok:false,
                    message: err
                })
            }
            res.json({
                ok: true,
                books,
                total: count
            })
        })
    });
});


app.post('/books', [verifyToken, verifyRole], (req, res) => {
    let body = req.body;

    let book = new Book({
        title: body.title,
        description: body.description,
        nationality: body.nationality,
        price: body.price,
        authorId: body.authorId,
        userId: body.userId
    });

    book.save((err, bookDB) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        return res.status(201).json({
            ok: true,
            book: bookDB
        });
    });
});

app.put("/books/:bookId", [verifyToken], (req, res) => {
    let bookId = req.params.bookId;
    let body = _.pick(req.body, ['title', 'description', 'price']);
    
    Book.findByIdAndUpdate(bookId, body, {
        new: true,
        runValidators: true
    }, (err, bookDB) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok:true,
            book: bookDB
        });
    });
});

app.delete('/books/:bookId', [verifyToken, verifyRole],  (req, res) => {
    let bookId = req.params.bookId;
    let deleteState = {
        state: false,
    }
    Book.findByIdAndUpdate(bookId, deleteState, (err, bookDeleted) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if(!bookDeleted) {
            return res.status(404).json({
                ok: false,
                err: {
                    message: 'No se ha encontrado el libro'
                }
            });
        }

        res.json({
            ok:true,
            book: bookDeleted
        });
    });
})

module.exports = app;
