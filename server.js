const express = require("express");
const bodyParser = require("body-parser");
const morgan = require('morgan');

require("dotenv").config();

const db = require("./db/database");

const { PORT } = require("./config/config");

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

// database connection
db.then(() => console.log("Database connected")).catch(() =>
  console.log("No es posible conectarse a la base de datos")
);

app.use(require("./routes"));

app.listen(PORT, () => {
  console.log(`Listen PORT: ${PORT}`);
});
