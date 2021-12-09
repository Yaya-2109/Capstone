const router = require('express').Router();
// const itinerariesRouter = require('./itineraries');

const {
  models: { Itinerary, User, ItineraryEvents, Events },
} = require('../db');
module.exports = router;

// GET /users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: [
        'id',
        'username',
        'email',
        'firstName',
        'lastName',
        'avatar',
      ],
    });
    res.send(users);
  } catch (error) {
    next(error);
  }
});

// GET /users/userId
router.get('/:userId', async (req, res, next) => {
  try {
    let user = await User.findByPk(req.params.userId, {
      include: Itinerary,
    });

    let safeUserData = {
      id: user.dataValues.id,
      username: user.dataValues.username,
      email: user.dataValues.email,
      firstName: user.dataValues.firstName,
      lastName: user.dataValues.lastName,
      avatar: user.dataValues.avatar,
    };

    res.send(user);
  } catch (error) {
    next(error);
  }
});

// POST /users/userId
router.post('/:userId', async (req, res, next) => {
  try {
    const createdItinerary = await Itinerary.create({
      ...req.body,
      userId: req.params.userId,
    });
    await createdItinerary.addUser(req.params.userId);
    res.send(createdItinerary);
  } catch (error) {
    next(error);
  }
});

// GET /users/userId/itineraries
router.get('/:userId/itineraries', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    const itineraries = await user.getItineraries();
    res.send(itineraries);
  } catch (error) {
    next(error);
  }
});

// GET /users/userId/itineraries/itineraryId
router.get('/:userId/itineraries/:itineraryId', async (req, res, next) => {
  try {
    const itinerary = await Itinerary.findByPk(req.params.itineraryId, {
      include: Events,
    });
    res.send(itinerary);
  } catch (error) {
    next(error);
  }
});
