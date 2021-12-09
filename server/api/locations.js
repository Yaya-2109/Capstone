const router = require('express').Router()
module.exports = router

const axios = require('axios')

router.get('/', async (req, res, next) => {
  try {

    const isValidBounds = (bounds) => {
      if(JSON.parse(req.query.ne).lng > 180 || JSON.parse(req.query.sw).lng < -180) {
        return false
      }
      return true
    }

    if(isValidBounds()) {
      const { data: { data } } = await axios.get(
        `https://travel-advisor.p.rapidapi.com/${req.query.type}/list-in-boundary`, {
        params: {
          bl_latitude: JSON.parse(req.query.sw).lat,
          tr_latitude: JSON.parse(req.query.ne).lat,
          bl_longitude: JSON.parse(req.query.sw).lng,
          tr_longitude: JSON.parse(req.query.ne).lng
        },
        headers: {
          'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
          'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY
        }
      })
      console.log(data)
      res.send(data)
    }

    res.status(400).send()

  } catch (error) {
    next(error)
  }
})
