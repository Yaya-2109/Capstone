import axios from 'axios';

// ACTION TYPES
const CREATE_ITINERARY = 'CREATE_ITINERARY';
const GET_ALL_ITINERARIES = 'GET_ALL_ITINERARIES';

// ACTION CREATORS
export const setItinerary = (itinerary) => {
  return {
    type: CREATE_ITINERARY,
    itinerary,
  };
};

export const setAllItineraries = (itineraries) => {
  return {
    type: GET_ALL_ITINERARIES,
    itineraries,
  };
};

// THUNK CREATORS
export const createItinerary = (itinerary, userId) => {
  return async (dispatch) => {
    try {
      const { data: created } = await axios.post(
        `/api/users/${userId}/itineraries`,
        itinerary
      );
      dispatch(setItinerary(created));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchAllItineraries = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/users/${userId}/itineraries`);
      dispatch(setAllItineraries(data));
    } catch (error) {
      console.error(error);
    }
  };
};

const initialState = [];

// REDUCER FUNCTION
export default function allItinerariesReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_ITINERARY:
      return [...state, action.itinerary];
    case GET_ALL_ITINERARIES:
      return action.itineraries;
    default:
      return state;
  }
}