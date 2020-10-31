const express = require('express');
const _ = require('lodash');

const Car = require('../models/car');
const { verifyToken, verifyRole } = require('../middlewares/auth');
const app = express();

app.post('/cars', [verifyToken, verifyRole], (req, res) => {
    let body = req.body;

    let car = new Car({
        nit: body.nit,
        name: body.name,
        books: [],
        userId: body.userId
    });

    car.save((err, carDB) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        return res.status(201).json({
            ok: true,
            car: carDB
        });
    });
});

module.exports = app;
