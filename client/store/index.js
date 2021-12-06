import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import allItinerariesReducer from './createItinerary';
import map from './map';
import itineraries from './itineraries';
import itinerary from './itinerary';
import updateItineraryReducer from './updateItinerary';

const reducer = combineReducers({
  auth,
  map,
  itineraries,
  itinerary,
  allItineraries: allItinerariesReducer,
  itineraryDetails: updateItineraryReducer,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
