const server = require('./src/server');
const { connectTo } = require('./src/data/db');

connectTo('Pokemon')
  .then(() => console.log('API connected to database!! \n'))
  .catch(e => console.log(e));

server.listen(4500, () => {
  console.log('server is listening on port 4500');
});
