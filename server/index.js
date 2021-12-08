require('dotenv').config();
const { db } = require('./db');
const PORT = process.env.PORT || 8080;
const app = require('./app');
const seed = require('../script/seed');
const { Server } = require("socket.io")

const http = require('http');
const socket = require('socket.io');

const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

const init = async () => {
  try {
    if (process.env.SEED === 'true') {
      await seed();
    } else {
      await db.sync();
    }
    
    // start listening (and create a 'server' object representing our server)
    server.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));

    io.on('connection', (socket) => {
      console.log('New WS Connection...');

      const { roomId } = socket.handshake.query;
      socket.join(roomId);

      // Listen for new messages
      socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
        io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
      });

      // Leave the room if the user closes the socket
      socket.on("disconnect", () => {
        socket.leave(roomId);
      });

    });

  } catch (ex) {
    console.log(ex);
  }
};

init();
