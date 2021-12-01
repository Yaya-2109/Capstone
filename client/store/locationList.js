import axios from 'axios'

const GET_PLACES = 'GET_PLACES'

export const getPlaces = places => ({type: GET_PLACES, places})

export const getPlacesData = (type, sw, ne) => async dispatch => {
  try {

    const { data } = await axios.get('/api/locations', {
      params: {
        type,
        sw,
        ne
      }
    })

    dispatch(getPlaces(data))
  } catch (error) {
    console.log(error)
  }
}

export default function(state = [], action) {
  switch (action.type) {
    case GET_PLACES: {
      let cleanedUpPlaces = action.places.filter((place) => place.name && place.num_reviews > 0)
      return cleanedUpPlaces
    }
    default:
      return state
  }
}
