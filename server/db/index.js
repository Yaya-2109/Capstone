//this is the access point for all things database related!
const Itinerary = require("./models/Itinerary");
const User = require("./models/User");
const Events = require("./models/Events");
const ItineraryEvents = require("./models/ItineraryEvents");

const db = require('./db')


//associations could go here!
User.belongsToMany(Itinerary, {through: "userItineraries"})
Itinerary.belongsToMany(User, {through: "userItineraries"})

Itinerary.belongsToMany(Events, {through: ItineraryEvents})
Events.belongsToMany(Itinerary, {through: ItineraryEvents})

module.exports = {
  db,
  models: {
    User,
    Itinerary,
    Events,
    ItineraryEvents
  },
}
