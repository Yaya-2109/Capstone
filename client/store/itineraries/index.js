import axios from "axios";

//action types
const GET_ITINERARIES = "GET_ITINERARIES";

//action creators
export const getItineraries = (itineraries) => {
  return { type: GET_ITINERARIES, itineraries };
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

//reducer
let initialState = [];

// itineraries for a user, and itineraryEvent join table rows

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ITINERARIES:
      return action.itineraries
    default:
      return state;
  }
}
