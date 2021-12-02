import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import CreateItinerary from './components/CreateItinerary/CreateItinerary';
import { me } from './store';

import Itinerary from './components/Itinerary/Itinerary';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route exact path='/users/:userId' component={CreateItinerary} />
            {/* <Redirect to="/home" /> */}
            {/* <Route path='/itinerary' component={Itinerary} /> */}
            {/* <Redirect exact to='/' /> */}
          </Switch>
        ) : (
          <Switch>
            <Route path='/' exact component={Login} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            {/* <Redirect to='/home' /> */}
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
