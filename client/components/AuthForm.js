import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div className="container h-screen grid grid-cols-12">
      <div className="relative col-span-8 overflow-hidden ">
        <img
          className="h-full object-cover object-left w-auto absolute"
          src="https://img.wallpapersafari.com/desktop/1366/768/4/4/CO8lnY.jpg"
        />
      </div>
      <div className="col-span-4 p-5 flex items-center">
        <div className="">
          <p className="font-light text-4xl text-purple-400">
            Welcome to BooyaTravel.
          </p>
          <p className="font-light text-2xl text-gray-400 mb-4">
            Please {displayName} to get started:
          </p>
          <form onSubmit={handleSubmit} name={name}>
            <div>
              <label htmlFor="username">
                <p className="text-gray-600 mx-3 text-light">Username</p>
              </label>
              <input
                className="m-3 m-3 p-1 border border-2 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Username"
                name="username"
                type="text"
              />
            </div>
            <div>
              <label htmlFor="password">
                <p className="text-gray-600 mx-3 text-light">Password</p>
              </label>
              <input
                className="m-3 m-3 p-1 border border-2 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Password"
                name="password"
                type="password"
              />
            </div>
            {displayName === `Sign Up` ? (
              <div>
                <div>
                  <label htmlFor="email">
                    <p className="text-gray-600 mx-3 text-light">
                      Email Address
                    </p>
                  </label>
                  <input
                    className="m-3 m-3 p-1 border border-2 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Email"
                    name="email"
                    type="text"
                  />
                </div>
                <div>
                  <label htmlFor="firstName">
                    <p className="text-gray-600 mx-3 text-light">First Name</p>
                  </label>
                  <input
                    className="m-3 p-1 border border-2 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="First Name"
                    name="firstName"
                    type="text"
                  />
                </div>
                <div>
                  <label htmlFor="lastName">
                    <p className="text-gray-600 mx-3 text-light">Last Name</p>
                  </label>
                  <input
                    className="m-3 m-3 p-1 border border-2 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Last Name"
                    name="lastName"
                    type="text"
                  />
                </div>
              </div>
            ) : null}
            <div>
              <button
                className="text-white uppercase bg-purple-400 hover:bg-purple-500 p-2 px-3 my-5"
                type="submit"
              >
                {displayName}
              </button>
            </div>
            {error && error.response && <div> {error.response.data} </div>}
          </form>
        </div>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      const email = evt.target.email?.value;
      const firstName = evt.target.firstName?.value;
      const lastName = evt.target.lastName?.value;
      dispatch(
        authenticate(username, password, formName, email, firstName, lastName)
      );
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
