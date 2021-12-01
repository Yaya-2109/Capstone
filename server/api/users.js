const router = require('express').Router();
const { User } = require('../db/index');
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
    const user = await User.findByPk(req.params.userId);
    let safeUserData = {
      id: user.dataValues.id,
      username: user.dataValues.username,
      email: user.dataValues.email,
      firstName: user.dataValues.firstName,
      lastName: user.dataValues.lastName,
      avatar: user.dataValues.avatar,
    };
    res.send(safeUserData);
  } catch (error) {
    next(error);
  }
});
