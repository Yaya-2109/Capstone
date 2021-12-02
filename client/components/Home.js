import React from "react";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchItinerary, fetchItineraries } from "../store/itinerary";
/**
 * COMPONENT
 */
export const Home = (props) => {
  // These lines sets state in store to current user and their itinerary. Should be all itineraries in future.
  const user = useSelector((state) => state.auth);
  // const itineraries = useSelector((state) => state.itineraries);
  const itinerary = useSelector((state) => state.itinerary);
  const { username } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(fetchItineraries(user.id));
    dispatch(fetchItineraries(user.id));
  }, []);
  //
  return (
    <div>
      <h3>Welcome, {username}</h3>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
