import axios from 'axios';

// ACTION TYPES
const GET_ITINERARY = 'GET_ITINERARY';
const UPDATE_ITINERARY = 'UPDATE_ITINERARY';

// ACTION CREATORS
export const getItinerary = (itinerary) => {
  return { type: GET_ITINERARY, itinerary };
};

export const updatedItinerary = (itinerary) => {
  return { type: UPDATE_ITINERARY, itinerary };
};

// THUNK CREATORS
export const fetchItinerary = (userId, itineraryId) =>
  async function (dispatch) {
    try {
      let { data } = await axios.get(
        `/api/users/${userId}/itineraries/${itineraryId}/edit`
      );
      dispatch(getItinerary(data));
    } catch (err) {
      return err;
    }
  };

export const updateItinerary = (itinerary, itineraryId) =>
  async function (dispatch) {
    try {
      let { data } = await axios.put(
        `/api/users/${itinerary.userId}/itineraries/${itineraryId}/edit`
      );
      dispatch(updatedItinerary(data));
    } catch (err) {
      return err;
    }
  };

let initialState = [];

// REDUCER FUNCTION
export default function updateItineraryReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ITINERARY:
      return action.itinerary;
    case UPDATE_ITINERARY:
      return action.itinerary;
    default:
      return state;
  }
}
