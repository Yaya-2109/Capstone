const router = require('express').Router();
const { Events } = require('pg');
const Sequelize = require('sequelize');
const {
  models: { Itinerary, User, ItineraryEvent, Event },
} = require('../db');
const ItineraryEvents = require('../db/models/ItineraryEvent');

module.exports = router;

//api/itinerary/:itineraryId/userId => gets a user's single itinerary dby their ids
router.get('/:itineraryId/:userId', async (req, res, next) => {
  try {
    const itinerary = await Itinerary.findByPk(req.params.itineraryId, {
      include: Event,
    });

    const events = await itinerary.getEvents();

    // events.forEach((event) => {
    //   console.log(event.itineraryEvents)
    // })
    const massagedRes = {
      ...itinerary.dataValues,
      events,
    };

    res.send(massagedRes);
  } catch (error) {
    next(error);
  }
});

//get all a users itineraries
router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    const itineraries = await user.getItineraries();
    res.send(itineraries);
  } catch (error) {
    next(error);
  }
});

// delete an event from itinerary in itinerary view when click X on card
router.delete('/delete/:itineraryId/:eventId', async (req, res, next) => {
  try {
    const itinerary = await Itinerary.findByPk(req.params.itineraryId);
    const deletedEvent = await Event.findOne({
      where: {
        itineraryId: req.params.itineraryId,
        id: req.params.eventId,
      },
    });
    await itinerary.removeEvent(req.params.eventId);
    await Event.destroy({
      where: {
        itineraryId: req.params.itineraryId,
        id: req.params.eventId,
      },
    });

    res.send(deletedEvent);
    // res.status(202).send(updatedEvents);
  } catch (error) {
    next(error);
  }
});

// edit order of events, day 0 is unassigned // not functional yet
router.put('/edit/:itineraryId', async (req, res, next) => {
  try {
    // let Events = await ItineraryEvent.findAll({
    //   where: {
    //     itineraryId: req.params.itineraryId,
    //   },
    // });
    const allEvents = req.body;

    allEvents.forEach(async (event, index) => {
      const foundEvent = await ItineraryEvent.findOne({
        where: {
          itineraryId: event.itineraryId,
          eventId: event.eventId,
        },
      })
      .then((data) => {
        const singleEvent = data.find((event) => {
          return (
            event.eventId === foundEvent.eventId &&
            event.itineraryId === foundEvent.itineraryId
          );
        })
      .then((foundedEvent) => await foundedEvent.update(singleEvent))
      })
    .then(() => {
      const itinerary = await Itinerary.findByPk(req.params.itineraryId, {
        include: Event,
      });
      const events = await itinerary.getEvents();
    })
    .then(() => {
      const massagedRes = {
        ...itinerary.dataValues,
        events,
      };
      massagedRes.events.forEach((event) => {
        console.log(event.itineraryEvents)
      })
    })
    // res.send("hi")
  } catch (error) {
    next(error);
  }
});
