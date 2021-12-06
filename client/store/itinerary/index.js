import axios from 'axios';

//action types
const GET_ITINERARIES = 'GET_ITINERARIES';
const GET_ITINERARY = 'GET_ITINERARY';
const DELETE_EVENT = 'DELETE_EVENT';
const UPDATE_ITINERARY = 'UPDATE_ITINERARY';

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

export const updateItinerary = (events) => {
  return { type: UPDATE_ITINERARY, events };
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

export const removeEvent = (trip, user) =>
  async function (dispatch) {
    const { itineraryId, id } = trip;

    try {
      let { data } = await axios.delete(
        `/api/itinerary/delete/${itineraryId}/${id}`
      );
      dispatch(deleteEvent(data));
      dispatch(fetchItinerary(itineraryId, user.id));
    } catch (err) {
      return err;
    }
  };

//not functional
export const reorderItinerary = (updatedItineraryEvents) =>
  async function (dispatch) {
    try {
      const { data } = await axios.put(
        `/api/itinerary/edit/${updatedItineraryEvents[0].itineraryId}`,
        updatedItineraryEvents
      )

      dispatch(fetchItinerary(data.id, data.userId))
    } catch (err) {
      return err;
    }
  };

//reducer
let initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ITINERARY: {
      console.log('ACTION: ', action);
      const sorted = action.itinerary.events.sort((a, b) => {
        return a.itineraryEvents.position - b.itineraryEvents.position;
      });
      return { ...state, ...action.itinerary, events: sorted };
    }
    case DELETE_EVENT: {
      let newState = state.events.filter(
        (event) => event.id !== action.event.id
      );
      return newState;
    }
    case UPDATE_ITINERARY: {
      const sorted = action.events.sort((a, b) => {
        return a.itineraryEvents.position - b.itineraryEvents.position;
      });
      console.log(sorted);
      return { ...state, events: sorted };
    }
    default:
      return state;
  }
}
