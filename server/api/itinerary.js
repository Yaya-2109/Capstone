const router = require("express").Router();
const Sequelize = require("sequelize");
const {
  models: { Itinerary, User, UsersItineraries },
} = require("../db");

module.exports = router;

router.get("/:userId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    const itinerary = await user.getItineraries();
    console.log(itinerary);
    res.send(itinerary);
  } catch (error) {
    next(error);
  }
});
