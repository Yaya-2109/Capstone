require('dotenv').config();
const { db } = require('./db');
const PORT = process.env.PORT || 8080;
const app = require('./app');
const seed = require('../script/seed');

const http = require('http');
const socket = require('socket.io');

const server = http.createServer(app);
const io = socket(server);

io.on('connection', (socket) => {
  console.log('New WS Connection...');
});

const init = async () => {
  try {
    if (process.env.SEED === 'true') {
      await seed();
    } else {
      await db.sync();
    }
    // start listening (and create a 'server' object representing our server)
    app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));
  } catch (ex) {
    console.log(ex);
  }
};

init();
