const express = require('express');

const Car = require('../models/car');

const app = express();

app.get('/cars/:carId/books', (req, res) => {
    const carId = req.params.carId;

    Car.findOne({ _id: carId }).then(carDB => {
        res.json({
            ok: true,
            books: carDB.books
        })
    }).catch(err => {
        res.status(400).json({
            ok: false,
            err
        })
    })
});

app.post('/cars/:carId/books', (req, res) => {
    const carId = req.params.carId;
    
    Car.findByIdAndUpdate(carId,
        {
            $push: { books: req.body }
        },
        {
            new: true
        },
        (err, carDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            res.status(201).json({
                ok: true,
                books: carDB.books
            })
        })
    
})

app.delete("/cars/:carId/books/:bookId", (req, res) => {
    let carId = req.params.carId;
    
    Car.findByIdAndUpdate(carId, 
        { 
            $pull: { books: { _id: req.params.bookId} }
        }, (err, carDB) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.status(201).json({
            ok: true,
            books: carDB.books
        })
    })
  });

module.exports = app;