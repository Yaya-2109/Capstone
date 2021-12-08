import axios from "axios";
import { fetchItineraries } from "./itineraries";

// ACTION TYPES
const CREATE_ITINERARY = "CREATE_ITINERARY";
const GET_ALL_ITINERARIES = "GET_ALL_ITINERARIES";
const DELETE_ITINERARY = "DELETE_ITINERARY";

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

export const destroyItinerary = (itinerary) => {
  return { type: DELETE_ITINERARY, itinerary };
};

// THUNK CREATORS
export const createItinerary = (itinerary, userId) => {
  return async (dispatch) => {
    try {
      const { data: created } = await axios.post(
        `/api/users/${userId}`,
        itinerary
      );
      dispatch(setItinerary(created));
      dispatch(fetchItineraries(userId));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchAllItineraries = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/users/${userId}`);
      dispatch(setAllItineraries(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteItinerary = (userId, itineraryId) =>
  async function (dispatch) {
    try {
      const { data } = await axios.delete(`/api/itinerary/${itineraryId}`);
      dispatch(destroyItinerary(data));
      dispatch(fetchItineraries(userId));
    } catch (err) {
      return err;
    }
  };

const initialState = [];

// REDUCER FUNCTION
export default function allItinerariesReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_ITINERARY:
      return {
        ...state,
        itineraries: [...state.itineraries, action.itinerary],
      };
    case GET_ALL_ITINERARIES:
      return action.itineraries;
    case DELETE_ITINERARY: {
      let newItineraries = state.itineraries.filter(
        (itinerary) => itinerary.id !== action.itinerary.id
      );
      let newState = state;
      newState.itineraries = newItineraries;
      return newState;
    }
    default:
      return state;
  }
}
