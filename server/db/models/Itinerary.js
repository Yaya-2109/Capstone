const Sequelize = require("sequelize");
const db = require("../db");

const Itinerary = db.define("itinerary", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  startDate: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  endDate: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
})

module.exports = Itinerary