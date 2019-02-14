const server = require('./src/server');
const { connectTo } = require('./src/data/db');

const PORT = 4500;
const HOST = '0.0.0.0';

connectTo('Pokemon')
  .then(() => console.log('API connected to database!! \n'))
  .catch(e => console.log(e));

server.listen(PORT, HOST);

console.log(`Running on http://${HOST}:${PORT}`);
