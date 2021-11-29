import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div className="bg-green-400 text-white flex items-center justify-between h-16 p-2">
    <div>
      <h1>BooyaTravel</h1>
    </div>
    <div className="">
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link className="p-2 border-2 rounded-md" to="/itinerary">
            Itinerary
          </Link>
          <Link className="p-2" to="/login">
            Login
          </Link>
          <Link className="p-2" to="/signup">
            Sign Up
          </Link>
        </div>
      )}
    </div>
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
