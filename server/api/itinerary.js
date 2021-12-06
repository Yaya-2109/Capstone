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
    const allEvents = req.body;

    const findAndUpdateEvents = () => allEvents.forEach(async (event) => {
      await ItineraryEvent.findOne({
        where: {
          itineraryId: event.itineraryId,
          eventId: event.eventId,
        }
      })
      .then((foundEvent) => {
        const singleEvent = allEvents.find((event) => {
          return (
            event.eventId === foundEvent.eventId &&
            event.itineraryId === foundEvent.itineraryId
          );
        })
        foundEvent.update(singleEvent)
      })
    })

    findAndUpdateEvents()

    const itineraryId = allEvents[0].itineraryId
    const itinerary = await Itinerary.findByPk(itineraryId)

    res.send(itinerary)

    // const forEachPromise = new Promise((findAndUpdateEvents, rejectionFunc) => {
    //   setTimeout(() => {
    //     findAndUpdateEvents()
    //   }, 300);
    // })

    // const values = Promise.all(
    //   [
    //     forEachPromise,
    //     await Itinerary.findByPk(req.params.itineraryId, {
    //       include: Event,
    //     })
    //   ]
    // )
    // .then(async (values) => {
    //   // console.log(values[1])
    //   const itinerary = values[1]
    //   // console.log(itinerary.events)
    //   const { id, name, startDate, endDate, userId } = itinerary
    //   res.send({id, name, startDate, endDate, userId, events: await itinerary.getEvents()})
    // })
  } catch (error) {
    next(error);
  }
});
