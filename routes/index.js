const express = require('express');

const app = express();

app.use(require('./users'));
app.use(require('./login'));

app.use(require('./authors'));
app.use(require('./books'));
app.use(require('./cars'));
app.use(require('./carBooks'));

module.exports = app;