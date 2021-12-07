const router = require("express").Router();
const { Events } = require("pg");
const Sequelize = require("sequelize");

const {
  models: { Itinerary, User, ItineraryEvent, Event },
} = require("../db");
const ItineraryEvents = require("../db/models/ItineraryEvent");

module.exports = router;

async function getItinerarybyId(req, res, next) {
  try {
    const itinerary = await Itinerary.findByPk(req.params.itineraryId, {
      include: Event,
    });

    const events = await itinerary.getEvents();

    const massagedRes = {
      ...itinerary.dataValues,
      events,
    };

    console.log(massagedRes);
    res.send(massagedRes);
  } catch (error) {
    next(error);
  }
}
//api/itinerary/:itineraryId/userId => gets a user's single itinerary dby their ids
router.get("/:itineraryId/:userId", getItinerarybyId);

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
    const itinerary = await Itinerary.findByPk(req.params.itineraryId);

    await itinerary.createEvent({
      ...req.body,
      imageUrl: req.body.photo.images.large.url,
      eventType: req.body.category.name,
      itineraryId: req.params.itineraryId,
      eventReponse: req.body,
    });
  } catch (error) {
    next(error);
  }
});

// delete an event from itinerary in itinerary view when click X on card
router.delete("/delete/:itineraryId/:eventId", async (req, res, next) => {
  try {
    const itinerary = await Itinerary.findByPk(req.params.itineraryId);
    const deletedEvent = await Event.findOne({
      where: {
        itineraryId: req.params.itineraryId,
        id: req.params.eventId,
      },
    });
    const deletedEventPosition = await ItineraryEvents.findOne({
      where: {
        itineraryId: req.params.itineraryId,
        eventId: deletedEvent.id,
      },
    });
    await itinerary.removeEvent(req.params.eventId);
    await Event.destroy({
      where: {
        itineraryId: req.params.itineraryId,
        id: req.params.eventId,
      },
    });
    const events = await ItineraryEvents.findAll({
      where: {
        itineraryId: req.params.itineraryId,
      },
    });
    events.forEach(async (event) => {
      if (
        event.position !== null &&
        event.position > deletedEventPosition.position
      ) {
        await event.update({ position: event.position - 1 });
      }
    });

    res.send(deletedEvent);
  } catch (error) {
    next(error);
  }
});

// edit order of events, day 0 is unassigned // not functional yet
router.put(
  "/edit/:itineraryId",
  async (req, res, next) => {
    try {
      const allEvents = req.body;
      await Promise.all(
        allEvents.map(async (event) => {
          await ItineraryEvent.findOne({
            where: {
              itineraryId: event.itineraryId,
              eventId: event.eventId,
            },
          }).then((foundEvent) => {
            const singleEvent = allEvents.find((event) => {
              return (
                event.eventId === foundEvent.eventId &&
                event.itineraryId === foundEvent.itineraryId
              );
            });
            foundEvent.update(singleEvent);
          });
        })
      );
      next();
    } catch (error) {
      next(error);
    }
  },
  getItinerarybyId
);

// Add user to itinerary (invite functionality)
router.put(`/invite/:itineraryId`, async (req, res, next) => {
  try {
    let itinerary = await Itinerary.findByPk(req.params.itineraryId);
    let user = await User.findOne({ where: { username: req.body.userName } });
    await itinerary.addUser(user.dataValues.id);
    itinerary.save();
    res.send(itinerary);
  } catch (err) {
    next(err);
  }
});
