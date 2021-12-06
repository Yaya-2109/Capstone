import React from "react";
import { connect } from "react-redux";
import { fetchItineraries } from "../../store/itineraries";
import { Itinerary } from "../Itinerary/Itinerary";

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
      this.props.fetchItineraries(this.props.userId);
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
      <div className="grid gap-4 p-4 grid-rows-12">
        <div className="flex flex-row row-span-3 filter mx-auto">
          <form onSubmit={handleSubmit}>
            <label htmlFor="name" className="text-purple-400">
              Make a New Itinerary
            </label>
            <input
              className="mx-3 p-1 border border-2 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              name="name"
              onChange={handleChange}
              value={name}
              placeholder="Destination"
            />

            <label className="text-gray-400" htmlFor="startDate">
              Starts:
            </label>
            <input
              className="mx-3 p-1 border border-2 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              name="startDate"
              onChange={handleChange}
              value={startDate}
              type="date"
            />

            <label className="text-gray-400" htmlFor="endDate">
              Ends:
            </label>
            <input
              className="mx-3 p-1 border border-2 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              name="endDate"
              onChange={handleChange}
              value={endDate}
              type="date"
            />

            <button
              className="mx-3 font-sm border border-2 border-purple-400 p-1 rounded-md text-purple-400 hover:bg-purple-500 hover:text-white"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
        <div className="flex row-span-9 ">
          {itineraries.length > 0 ? (
            itineraries.map((itinerary) => {
              return (
                <div
                  className="flex justify-center text-center m-5 p-5 border border-2 rounded-md w-1/6 h-32 hover:border-purple-400"
                  key={itinerary.id}
                >
                  <Link
                    to={`/users/${this.props.userId}/itineraries/${itinerary.id}`}
                  >
                    <p className="text-lg text-purple-400">{itinerary.name}</p>
                    <p className="text-sm text-gray-400">
                      Start Date: {itinerary.startDate}
                    </p>
                    <p className="text-sm text-gray-400">
                      End Date: {itinerary.endDate}
                    </p>
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
  fetchItineraries: (userId) => dispatch(fetchItineraries(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateItinerary);
