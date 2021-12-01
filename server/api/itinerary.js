const router = require("express").Router();
const Sequelize = require("sequelize");
const {
  models: { Itinerary, User, ItineraryEvents, Events },
} = require("../db");

module.exports = router;

//api/itinerary/:itineraryId/userId => gets a user's single itinerary by their ids
router.get("/:itineraryId/:userId", async (req, res, next) => {
  try {
    const itinerary = await Itinerary.findByPk(req.params.itineraryId, {
      include: Events,
    });
    res.send(itinerary);
  } catch (error) {
    next(error);
  }
});

//get all a users itineraries
router.get("/:userId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    const itineraries = await user.getItineraries();
    res.send(itineraries);
  } catch (error) {
    next(error);
  }
});

router.delete("/:itineraryId/:eventId", async (req, res, next) => {
  try {
    let itinerary = await Itinerary.findByPk(req.params.itineraryId);
    ItineraryEvents.destroy({
      where: {
        itineraryId: req.params.itineraryId,
        eventId: req.params.itineraryId,
      },
    });
    res.status(202).send();
  } catch (error) {
    next(error);
  }
});
