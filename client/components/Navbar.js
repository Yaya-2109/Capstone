import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn, person }) => (
  <div className="bg-green-400 text-white flex items-center justify-between h-16 p-2">
    <div>
      <p className="text-lg">
        {person.username
          ? "Welcome to BooyaTravel, " + person.username + "!"
          : "BooyaTravel!"}
      </p>
    </div>
    <div className="flex">
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link className="px-2" to="/home">
            {" "}
            Itineraries{" "}
          </Link>
          <Link className="px-2" to="/search">
            {" "}
            Search{" "}
          </Link>
          <a href="#" onClick={handleClick} className="px-2">
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link className="px-2" to="/login">
            Login
          </Link>
          <Link className="px-2" to="/signup">
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
    person: state.auth,
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
