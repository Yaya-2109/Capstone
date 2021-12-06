const Sequelize = require('sequelize');
const db = require('../db');

const ItineraryEvents = db.define('itineraryEvents', {
  day: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  position: {
    type: Sequelize.INTEGER
  }
});

module.exports = ItineraryEvents;
