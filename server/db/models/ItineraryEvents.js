const Sequelize = require("sequelize");
const db = require("../db");

const ItineraryEvents = db.define("itineraryEvents", {
  day: {
    type: Sequelize.STRING,
    defaultValue: "Day 0",
  },
  order: {
    type: Sequelize.INTEGER,
  },
});

module.exports = ItineraryEvents;
