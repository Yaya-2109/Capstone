const router = require("express").Router();
const Sequelize = require("sequelize");
const {
  models: { Itinerary, User, ItineraryEvent, Event },
} = require("../db");
const ItineraryEvents = require("../db/models/ItineraryEvent");

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
router.put("/edit/:itineraryId/:eventId", async (req, res, next) => {
  try {
    let Events = await ItineraryEvent.findAll({
      where: {
        itineraryId: req.params.itineraryId,
      },
    });
    // console.log("itinerary:", Events);
    let UpdatingEvent = await ItineraryEvent.findOne({
      where: {
        itineraryId : req.params.itineraryId,
        eventId: req.params.eventId
      }
    })
    let ourEvent = await ItineraryEvent.findOne({
      where: {
        itineraryId: req.params.itineraryId,
        eventId: req.params.eventId
      }
    })

    console.log("UpdatingEvent:", UpdatingEvent);
    // Events.forEach( async event => {
    //   if(event.position < req.body && event.position > UpdatingEvent.position) {
    //     await event.update({position: event.position - 1})
    //       await UpdatingEvent.update({positon: req.body})
    //     }
    //     // await UpdatingEvent.update({positon: req.body})
    //      else if(UpdatingEvent.position === null) {
    //     //  await UpdatingEvent.update({positon: req.body}) }
    //      if(event.position >= req.body) {
    //         await event.update({position: event.position + 1})
    //           await UpdatingEvent.update({positon: req.body})
    //         }
    //         // await UpdatingEvent.update({positon: req.body})
    //     } })
    //     // if(event.position >= req.body) {
    //     //   await event.update({position: event.position + 1}).then(async () => {
    //     //     await UpdatingEvent.update({positon: req.body})
    //     //   })
    //     //   // await UpdatingEvent.update({positon: req.body})
    //     // }
    const eventsBelow = Events.map(event => {
      console.log(event);
      if(event.position < req.body && event.position > UpdatingEvent.position) {
        return event.dataValues;
      }
    })
    const eventsAbove = [];
    Events.forEach(event => {
      if(UpdatingEvent.position === null) {
        if(event.position >= req.body) {
          eventsAbove.push(event.dataValues);
        }
      }
    })
    console.log(eventsBelow)
    console.log(eventsAbove)
    res.status(202).send("hi");
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