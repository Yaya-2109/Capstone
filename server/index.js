const { db } = require('./db')
const PORT = process.env.PORT || 8080
const app = require('./app')
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const seed = require('../script/seed');

const init = async () => {
  try {
    if(process.env.SEED === 'true'){
      await seed();
    }
    else {
      await db.sync()
    }
    // start listening (and create a 'server' object representing our server)
    server.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`))
    io.on('connection', (socket) => {
      console.log('a user connected');
      io.on('disconnect', () => {
        console.log('user disconnected');
      });
    });
    io.on('connection', () => {
      io.on('chat message', msg => {
        io.emit('chat message', msg);
      });
    });
  } catch (ex) {
    console.log(ex)
  }
}

module.exports = io;

init()
