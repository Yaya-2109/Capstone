import React from "react";
import { connect } from "react-redux";
import { fetchItineraries } from "../../store/itineraries";
import { inviteUser } from "../../store/itinerary";
import { Itinerary } from "../Itinerary/Itinerary";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import {
  createItinerary,
  fetchAllItineraries,
  deleteItinerary,
} from "../../store/createItinerary";

class CreateItinerary extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      startDate: "",
      endDate: "",
      invite: "",
    };
    //for date format helper function

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.inviteHandler = this.inviteHandler.bind(this);
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

  inviteHandler(evt) {
    evt.preventDefault();

    this.props.inviteUser(this.state.invite, evt.target.id);
    evt.target.value = "";
    this.setState({
      invite: "",
    });
  }

  render() {
    const { name, startDate, endDate, invite } = this.state;
    const { handleSubmit, handleChange, inviteHandler } = this;
    const itineraries = this.props.itineraries || [];

    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const dateFormat = (date) => {
      let year = date.slice(0, 4);
      let month = Number(date.slice(5, 7));
      let day = date.slice(8, 10);

      if (month[0] === 0) {
        month = month[1];
      }
      for (let i = 0; i < months.length + 1; i++) {
        if (month === i) {
          month = months[i - 1];
        }
      }
      return `${month} ${day}, ${year}`;
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
        <div className="flex justify-center flex-wrap row-span-9 ">
          {itineraries.length > 0 ? (
            itineraries.map((itinerary) => {
              return (
                <div
                  className="flex flex-col m-5 pb-5 px-5 pt-2 border border-2 w-2/6 rounded-md hover:border-purple-400"
                  key={itinerary.id}
                >
                  <header className="flex justify-between">
                    <Link
                      to={`/users/${this.props.userId}/itineraries/${itinerary.id}`}
                    >
                      <div className="text-purple-400 font-light font-l">
                        {itinerary.name}
                        <p className="font-xs">
                          {dateFormat(itinerary.startDate)} -{" "}
                          {dateFormat(itinerary.endDate)}
                        </p>
                      </div>
                    </Link>
                    <div
                      onClick={() => {
                        this.props.deleteItinerary(
                          this.props.userId,
                          itinerary.id
                        );
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="#CCC"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </header>
                  <div className="flex p-2">
                    <Link
                      to={`/users/${this.props.userId}/itineraries/${itinerary.id}`}
                    >
                      {/* <p className="text-lg text-purple-400">
                        {itinerary.name}
                      </p> */}
                    </Link>
                  </div>
                  <footer className="flex  text-gray-400">
                    <form id={itinerary.id} onSubmit={inviteHandler}>
                      <div className="flex">
                        <label
                          htmlFor="invite"
                          className="text-s py-1 pr-2 text-gray-500"
                        >
                          Invite a friend:
                        </label>
                        <input
                          className="p-1 border border-2 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                          type="text"
                          name="invite"
                          placeholder="Username"
                          onChange={handleChange}
                        ></input>
                        <button className="text-purple-400 px-1" type="submit">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                        </button>
                      </div>
                    </form>
                  </footer>
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
  itineraries: state.itineraries,
  userId: state.auth.id,
  user: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  createItinerary: (itinerary, userId) =>
    dispatch(createItinerary(itinerary, userId)),
  getAllItineraries: (userId) => dispatch(fetchAllItineraries(userId)),
  fetchItineraries: (userId) => dispatch(fetchItineraries(userId)),
  inviteUser: (userName, itineraryId) =>
    dispatch(inviteUser(userName, itineraryId)),
  deleteItinerary: (userId, itineraryId) =>
    dispatch(deleteItinerary(userId, itineraryId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateItinerary);
