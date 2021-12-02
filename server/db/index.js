//this is the access point for all things database related!
const Itinerary = require('./models/Itinerary');
const User = require('./models/User');
const Event = require('./models/Event');
const ItineraryEvent = require('./models/ItineraryEvent');

const db = require('./db');

//associations could go here!
User.belongsToMany(Itinerary, { through: 'userItineraries' });
Itinerary.belongsToMany(User, { through: 'userItineraries' });
User.hasMany(Itinerary);

Itinerary.belongsToMany(Event, { through: ItineraryEvent });
Event.belongsToMany(Itinerary, { through: ItineraryEvent });
Itinerary.hasMany(Event);

module.exports = {
  db,
  models: {
    User,
    Itinerary,
    Event,
    ItineraryEvent,
  },
};
