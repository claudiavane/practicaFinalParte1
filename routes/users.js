const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('lodash');

const app = express();

const { verifyToken, verifyRole } = require('../middlewares/auth');

const User = require('../models/user');

/**
 * GET => Leer Informacion
 * POST => Crear Informacion
 * PUT => Actualizar Informacion
 * DELETE => Eliminar Informacion
*/

// Devolver lista de usuarios
app.get('/users', [verifyToken, verifyRole], (req, res) => {
    let from  = req.query.from || 0;
    from = Number(from);
    let limit = req.query.limit || 5;
    limit = Number(limit);
    let defaultFilters = {
        state: true
    }
    
    User.find(defaultFilters, 'name email role')
    .skip(from)
    .limit(limit)
    .exec((err, users) => {
        if(err) {
            return res.status(400).json({
                ok:false,
                message: err
            })
        }
        User.find(defaultFilters).count((err, count) => {
            if(err) {
                return res.status(400).json({
                    ok:false,
                    message: err
                })
            }
            res.json({
                ok: true,
                users,
                total: count
            })
        })
        
    });
});

// Devolver un usuario por su id
app.get('/users/:userId', [verifyToken],  (req, res) => {
    let userId = req.params.userId;
    
    User.findOne({_id: userId}, (err, userDB) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.json({
            ok: true,
            user: userDB
        });
    })
});
// crear nuevo usuario
app.post('/users', (req, res) => {
    let body = req.body;
    
    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    user.save((err, userDB) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.status(201).json({
            ok: true,
            user: userDB
        });
    })
});

app.put("/users/:userId", [verifyToken], (req, res) => {
    let userId = req.params.userId;
    let body = _.pick(req.body, ['name', 'email', 'role']);
    
    User.findByIdAndUpdate(userId, body, {
        new: true,
        runValidators: true
    }, (err, userDB) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok:true,
            user: userDB
        });
    });
  });

// Borrar un usuario
app.delete('/users/:userId', [verifyToken, verifyRole],  (req, res) => {
    let userId = req.params.userId;
    let deleteState = {
        state: false,
    }
    User.findByIdAndUpdate(userId, deleteState, (err, userDeleted) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if(!userDeleted) {
            return res.status(404).json({
                ok: false,
                err: {
                    message: 'No se ha encontrado el usuario'
                }
            });
        }

        res.json({
            ok:true,
            user: userDeleted
        });
    });
})

module.exports = app;