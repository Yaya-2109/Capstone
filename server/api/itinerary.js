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

// delete an event from itinerary in itinerary view when click X on card
router.delete("/delete/:itineraryId/:eventId", async (req, res, next) => {
  try {
    await ItineraryEvents.destroy({
      where: {
        itineraryId: req.params.itineraryId,
        eventId: req.params.eventId,
      },
    });
    newItinerary = await ItineraryEvents.findAll();
    res.status(202).send(newItinerary);
  } catch (error) {
    next(error);
  }
});

// edit order of events, day 0 is unassigned // not functional yet
router.put("/edit/:itineraryId", async (req, res, next) => {
  try {
    let itinerary = await ItineraryEvents.findOne({
      where: {
        itineraryId: req.params.itineraryId,
      },
    });
    console.log(itinerary);
    await itinerary.update(req.body);
    res.status(202).send(itinerary);
  } catch (error) {
    next(error);
  }
});
