const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const cors = require('cors');
const bcrypt = require('bcrypt');
const routes = require('./routes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
    user: 'postgres',
    host: 'db',
    database: 'rezoomed',
    password: 'Net_25',
    port: 5432,
});

app.use('/api', routes(pool, jwt, bcrypt));

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});