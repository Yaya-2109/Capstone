import axios from "axios";

//action types
const GET_ITINERARIES = "GET_ITINERARIES";
const GET_ITINERARY = "GET_ITINERARY";
const DELETE_EVENT = "DELETE_EVENT";
const UPDATE_ITINERARY = "UPDATE_ITINERARY";

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

export const updateItinerary = (itinerary) => {
  return { type: UPDATE_ITINERARY, itinerary };
};

//thunk creators
export const fetchItineraries = (userId) =>
  async function (dispatch) {
    try {
      let { data } = await axios.get(`/api/itinerary/${userId}`);
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

<<<<<<< HEAD
export const removeEvent = (itineraryId, tripId) =>
  async function (dispatch) {
    try {
      let { data } = await axios.delete(
        `/api/itinerary/delete/${itineraryId}/${tripId}`
=======
export const removeEvent = (trip, user) =>
async function (dispatch) {
    const { itineraryId, id } = trip

    try {
      let { data } = await axios.delete(
        `/api/itinerary/delete/${itineraryId}/${id}`
>>>>>>> db11703ffae6872cced84ce9ae872947b1fad0ce
      );
      dispatch(deleteEvent(data));
<<<<<<< HEAD
      // dispatch(getItinerary(trip.itinerary));
=======
      dispatch(fetchItinerary(itineraryId, user.id))
>>>>>>> db11703ffae6872cced84ce9ae872947b1fad0ce
    } catch (err) {
      return err;
    }
  };

//not functional
export const reorderItinerary = (itinerary, newOrder) =>
  async function (dispatch) {
    try {
      console.log(newOrder);
      let { data } = await axios.put(
        `api/itinerary/edit/${itinerary.id}`,
        newOrder
      );
      console.log("DATA", data);
      dispatch(updateItinerary(data));
    } catch (err) {
      return err;
    }
  };

//reducer
let initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ITINERARY:
      return action.itinerary;
    case DELETE_EVENT: {
      let newState = state.events.filter(
        (event) => event.id !== action.event.id
      );
      return newState;
    }
    case UPDATE_ITINERARY: {
      let newOrder = [...state];
      console.log("newOrder", newOrder);
      newOrder.events = action.events;
      return newOrder;
    }
    default:
      return state;
  }
}
