const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const server = express();
const { getPokemon } = require('./controllers/Pokemon');

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(morgan('dev'));

server.route('/').post(getPokemon);

module.exports = server;
