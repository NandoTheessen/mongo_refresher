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

server.route('/').get((req, res) => {
  res.status(200).json({
    header: 'Welcome to the Pokemon abilities API!',
    message: 'Please provide a Pokemons name to start finding abilities!'
  });
});
server.route('/:name').get(getPokemon);

module.exports = server;
