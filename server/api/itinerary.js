const router = require("express").Router();
const Sequelize = require("sequelize");
const {
  models: { Itinerary, User, ItineraryEvents },
} = require("../db");

module.exports = router;

//api/itinerary/userId => gets user's itinerary
router.get("/:userId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    const itinerary = await user.getItineraries({});
    const itineraryId = itinerary[0].id;
    const events = await ItineraryEvents.findAll({
      where: { itineraryId: itineraryId },
    });
    res.send(events);
  } catch (error) {
    next(error);
  }
});
