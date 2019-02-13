const express = require('express');
const server = express();
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const { connectTo } = require('./src/data/db');
const { getPokemon, savePokemon } = require('./src/controllers/Pokemon');

connectTo('Pokemon')
  .then(() => console.log('API connected to database!! \n'))
  .catch(e => console.log(e));

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(morgan('dev'));

server.route('/').post(getPokemon);

server.listen(4500, () => {
  console.log('server is listening on port 4500');
});
