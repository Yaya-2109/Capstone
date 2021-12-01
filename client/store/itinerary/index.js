import axios from "axios";

//action types
const GET_ITINERARY = "GET_ITINERARY";

//action creators
export const getItinerary = (itinerary) => {
  return { type: GET_ITINERARY, itinerary };
};

//thunk creators
export const fetchItinerary = (userId) =>
  async function (dispatch) {
    try {
      let { data } = await axios.get(`/api/itinerary/${userId}`);
      dispatch(getItinerary(data));
    } catch (err) {
      return err;
    }
  };

//reducer
export default function (state = [], action) {
  switch (action.type) {
    case GET_ITINERARY:
      return action.itinerary;
    default:
      return state;
  }
}
