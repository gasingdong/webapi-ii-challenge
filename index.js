const express = require('express');
const db = require('./data/db');

const server = express();


const port = 5000;
server.listen(port, () => console.log(`Server running on http://localhost:${port}/`));
