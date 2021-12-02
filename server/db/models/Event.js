const Sequelize = require("sequelize");
const db = require("../db");

const Event = db.define("event", {
  eventType: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  latitude: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  longitude: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
  },
  phoneNumber: {
    type: Sequelize.STRING,
  },
  address: {
    type: Sequelize.STRING,
  },
  website: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true,
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true,
    },
  },
  eventResponse: {
    type: Sequelize.JSON,
  },
});

module.exports = Event;
