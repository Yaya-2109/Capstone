const router = require("express").Router();
const Sequelize = require("sequelize");
const {
  models: { Itinerary, User, ItineraryEvent, Event },
} = require("../db");

module.exports = router;

//api/itinerary/:itineraryId/userId => gets a user's single itinerary dby their ids
router.get("/:itineraryId/:userId", async (req, res, next) => {
  try {
    const itinerary = await Itinerary.findByPk(req.params.itineraryId, {
      include: Event,
    });

    const events = await itinerary.getEvents()

    const massagedRes = {
      ...itinerary.dataValues,
      events
    }

    res.send(massagedRes);
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

// find the itinerary based on itinerary id
// itinerary create event
router.post("/addEvent/:itineraryId/:userId", async (req, res, next) => {
  try {
    const itinerary = await Itinerary.findByPk(req.params.itineraryId)

    await itinerary.createEvent({
      ...req.body,
      imageUrl: req.body.photo.images.large.url,
      eventType: req.body.category.name,
      itineraryId: req.params.itineraryId,
      eventReponse: req.body
    })
  } catch(error) {
    next(error)
  }
})

// delete an event from itinerary in itinerary view when click X on card
router.delete("/delete/:itineraryId/:eventId", async (req, res, next) => {
  try {

    const itinerary = await Itinerary.findByPk(req.params.itineraryId)
    const deletedEvent = await Event.findOne({
      where: {
        itineraryId: req.params.itineraryId,
        id: req.params.eventId
      }
    })
    await itinerary.removeEvent(req.params.eventId)
    await Event.destroy({
      where: {
        itineraryId: req.params.itineraryId,
        id: req.params.eventId
      }
    })

    res.send(deletedEvent)
    // res.status(202).send(updatedEvents);
  } catch (error) {
    next(error);
  }
});

// edit order of events, day 0 is unassigned // not functional yet
router.put("/edit/:itineraryId", async (req, res, next) => {
  try {
    let itinerary = await Itinerary.findOne({
      where: {
        id: req.params.itineraryId,
      },
      include: Event
    });
    const neededEvent = await Event.findOne({
      where: {
        id: 1
      }
    })
    console.log(neededEvent)
    const updatedSet = await neededEvent.dataValues.set('id', 24, {raw: true}).changed(id, true)
    console.log("Updated: ", updatedSet)
    itinerary.events = req.body
    res.status(202).send(itinerary);
  } catch (error) {
    next(error);
  }
});

// route.put("/dummyEdit/:itineraryId", async (req, res, next) => {
//   try {
//     let itinerary = await Itinerary.findOne({
//       where: {
//         id: req.params.itineraryId,
//       },
//       include: Event
//     });

//   }
