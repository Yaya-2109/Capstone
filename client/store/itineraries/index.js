import axios from "axios";

//action types
const GET_ITINERARIES = "GET_ITINERARIES";
const GET_ITINERARY = "GET_ITINERARY";
const DELETE_EVENT = "DELETE_EVENT";

//action creators
export const getItineraries = (itineraries) => {
  return { type: GET_ITINERARIES, itineraries };
};
export const getItinerary = (itinerary) => {
  return { type: GET_ITINERARY, itinerary };
};
export const deleteEvent = (event) => {
  return { type: DELETE_EVENT, event };
};

//thunk creators
export const fetchItineraries = (userId) =>
  async function (dispatch) {
    try {
      console.log(userId)
      let { data } = await axios.get(`/api/itinerary/${userId}`);
      console.log( data )
      dispatch(getItineraries(data));
    } catch (err) {
      return err;
    }
  };

export const fetchItinerary = (itineraryId, userId) =>
  async function (dispatch) {
    try {
      let { data } = await axios.get(`/api/itinerary/${itineraryId}/${userId}`);
      dispatch(getItinerary(data));
    } catch (err) {
      return err;
    }
  };

export const removeEvent = (itineraryId, eventId) =>
  async function (dispatch) {
    try {
      let { data } = await axios.delete(
        `/api/itinerary/delete/${itineraryId}/${eventId}`
      );
      console.log("DATA", data);
      dispatch(deleteEvent(data));
    } catch (err) {
      return err;
    }
  };

//reducer
let initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ITINERARIES:
      return action.itineraries
    case GET_ITINERARY:
      return action.itinerary;
    case DELETE_EVENT: {
      let newState = state.events.filter(
        (event) => event.id !== action.eventId
      );
      return newState;
    }
    default:
      return state;
  }
}
