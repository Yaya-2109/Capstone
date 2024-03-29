import axios from "axios";
import { setSuccess } from '../notification'

//action types
const GET_ITINERARY = "GET_ITINERARY";
const DELETE_EVENT = "DELETE_EVENT";
const UPDATE_ITINERARY = "UPDATE_ITINERARY";
const ADD_TO_ITINERARY = "ADD_TO_ITINERARY";
const ADD_USER = "ADD_USER";
// const DELETE_ITINERARY = "DELETE_ITINERARY";

//action creators
export const getItinerary = (itinerary) => {
  return { type: GET_ITINERARY, itinerary };
};
export const deleteEvent = (event) => {
  return { type: DELETE_EVENT, event };
};

export const updateItinerary = (events) => {
  return { type: UPDATE_ITINERARY, events };
};

export const _addEventToItinerary = (itinerary) => {
  return { type: ADD_TO_ITINERARY, itinerary };
};

export const addUser = (itinerary) => {
  return { type: ADD_USER, itinerary };
};

// export const destroyItinerary = (itinerary) => {
//   return { type: DELETE_ITINERARY, itinerary };
// };

//thunk creators

export const addEventToItinerary =
  ({ itineraryId, user, place, type }) =>
  async (dispatch) => {
    try {
      const res = await axios.post(
        `/api/itinerary/addEvent/${itineraryId}/${user.id}`,
        {...place, type}
      );
      if(res.status === 200) {
        dispatch(setSuccess(true))
      }
    } catch (err) {
      console.log(err);
    }
  };

// export const fetchItineraries = (userId) =>
//   async function (dispatch) {
//     try {
//       let { data } = await axios.get(`/api/itinerary/${userId}`);
//       dispatch(getItineraries(data));
//     } catch (err) {
//       return err;
//     }
//   };

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
      );
      dispatch(getItinerary(data));
      // setTimeout(() => {
      //   dispatch(fetchItinerary(data.id, data.userId))
      // })
    } catch (err) {
      return err;
    }
  };

export const inviteUser = (userName, itineraryId) =>
  async function (dispatch) {
    try {
      let userData = { userName: userName };
      const { data } = await axios.put(
        `/api/itinerary/invite/${itineraryId}`,
        userData
      );
      
      if(data.userId) {
        dispatch(setSuccess(true))
        setTimeout(() => {
          dispatch(setSuccess(false))
        }, 3000)
      }

      dispatch(addUser(data));

    } catch (err) {
      return err;
    }
  };

// export const deleteItinerary = (itineraryId) =>
//   async function (dispatch) {
//     try {
//       const { data } = await axios.delete(`/api/itinerary/${itineraryId}`);
//       dispatch(destroyItinerary(data));
//     } catch (err) {
//       return err;
//     }
//   };

//reducer
let initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ITINERARY: {
      const sorted = action.itinerary.events.sort((a, b) => {
        return a.itineraryEvents.position - b.itineraryEvents.position;
      });
      return { ...state, ...action.itinerary, events: sorted };
    }
    case DELETE_EVENT: {
      let newState = state.events.filter(
        (event) => event.id !== action.event.id
      );
      return {...state, events: newState }
    }
    case UPDATE_ITINERARY: {
      const sorted = action.events.sort((a, b) => {
        return a.itineraryEvents.position - b.itineraryEvents.position;
      });
      return { ...state, events: sorted };
    }
    case ADD_USER: {
      return action.itinerary;
    }

    default:
      return state;
  }
}
