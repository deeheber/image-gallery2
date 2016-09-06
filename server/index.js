const app = require('./lib/app');
const http = require('http');
const port = 3000;
require('./lib/setup-mongoose');

const server = http.createServer(app);

server.listen(port, err=>{
  if (err) return console.error(err);
  console.log('Server running on port 3000');
});
