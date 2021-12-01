const router = require("express").Router();
const Sequelize = require("sequelize");
const {
  models: { Itinerary, User, ItineraryEvents, Events },
} = require("../db");

module.exports = router;

//api/itinerary/userId => gets user's itinerary
router.get("/:userId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    const itinerary = await user.getItineraries();
    const events = await ItineraryEvents.findAll({
      where: { itineraryId: itinerary[0].id },
    });
    let eventArr = events.map((event) => event.eventId);
    let eventObjs = [];
    for (let i = 0; i < eventArr.length; i++) {
      eventObjs.push(await Events.findByPk(eventArr[i]));
    }
    res.send(eventObjs);
  } catch (error) {
    next(error);
  }
});
