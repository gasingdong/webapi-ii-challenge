require('dotenv').config();
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./api/apiRoutes');

const server = express();

server.use(cors());
server.use('/api', apiRoutes);

const port = process.env.PORT;
server.listen(port, () => console.log(`Server running on http://localhost:${port}/`));
