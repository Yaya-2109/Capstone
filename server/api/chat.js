const router = require('express').Router();

router.get("/", (req, res) => {
  console.log('hi')
  res.send({ response: "I am alive" }).status(200);

});

module.exports = router;
