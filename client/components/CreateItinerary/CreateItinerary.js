import React from "react";
import { connect } from "react-redux";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import {
  createItinerary,
  fetchAllItineraries,
} from "../../store/createItinerary";

class CreateItinerary extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      startDate: "",
      endDate: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    try {
      this.props.getAllItineraries(this.props.userId);
    } catch (error) {
      console.error(error);
    }
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.createItinerary({ ...this.state }, this.props.userId);
    this.setState({
      name: "",
      startDate: "",
      endDate: "",
    });
  }

  render() {
    const { name, startDate, endDate } = this.state;
    const { handleSubmit, handleChange } = this;
    const itineraries = this.props.itineraries || [];
    const capitalizeName = (name) => {
      const capitalName = name[0].toUpperCase().concat(name.slice(1));
      return capitalName;
    };

    return (
      <div>
        <div>
          {itineraries.length > 0 ? (
            itineraries.map((itinerary) => {
              return (
                <div key={itinerary.id}>
                  <Link
                    to={`/users/${this.props.userId}/itineraries/${itinerary.id}`}
                  >
                    <h1>{itinerary.name}</h1>
                    <h3>Start Date: {itinerary.startDate}</h3>
                    <h3>End Date: {itinerary.endDate}</h3>
                  </Link>
                </div>
              );
            })
          ) : (
            <h2>
              You have no existing Itineraries. To get started, please create a
              a new Itinerary.
            </h2>
          )}
        </div>
        <div>
          <h1>Welcome, {capitalizeName(this.props.user.username)}!</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Itinerary Name:</label>
            <input
              name="name"
              onChange={handleChange}
              value={name}
              placeholder="Your Itinerary Name"
            />

            <label htmlFor="startDate">Start Date:</label>
            <input
              name="startDate"
              onChange={handleChange}
              value={startDate}
              placeholder="YYYY-MM-DD"
            />

            <label htmlFor="endDate">End Date:</label>
            <input
              name="endDate"
              onChange={handleChange}
              value={endDate}
              placeholder="YYYY-MM-DD"
            />

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  itineraries: state.allItineraries.itineraries,
  userId: state.auth.id,
  user: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  createItinerary: (itinerary, userId) =>
    dispatch(createItinerary(itinerary, userId)),
  getAllItineraries: (userId) => dispatch(fetchAllItineraries(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateItinerary);
