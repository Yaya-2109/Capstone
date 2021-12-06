import React from 'react';
import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import { fetchItinerary, updateItinerary } from '../../store/updateItinerary';

class EditItinerary extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      startDate: '',
      endDate: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    try {
      this.props.getItinerary(
        this.props.userId,
        this.props.match.params.itineraryId
      );
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
    this.props.updateItinerary(
      { ...this.state },
      this.props.match.params.itineraryId
    );
    this.setState({
      name: '',
      startDate: '',
      endDate: '',
    });
  }

  render() {
    const { name, startDate, endDate } = this.state;
    const { handleSubmit, handleChange } = this;
    const itinerary = this.props.itineraryDetails || [];

    return (
      <div>
        <div>
          <div>
            <h1>Edit {itinerary.name} Below</h1>
            <Link
              to={`/users/${this.props.userId}/itineraries/${itinerary.id}`}
            >
              <h1>{itinerary.name}</h1>
              <h3>Start Date: {itinerary.startDate}</h3>
              <h3>End Date: {itinerary.endDate}</h3>
            </Link>
          </div>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor='name'>New Itinerary Name:</label>
            <input
              name='name'
              onChange={handleChange}
              value={name}
              placeholder='Your Itinerary Name'
            />

            <label htmlFor='startDate'>New Start Date:</label>
            <input
              name='startDate'
              onChange={handleChange}
              value={startDate}
              placeholder='YYYY-MM-DD'
            />

            <label htmlFor='endDate'>New End Date:</label>
            <input
              name='endDate'
              onChange={handleChange}
              value={endDate}
              placeholder='YYYY-MM-DD'
            />

            <button type='submit'>Submit Changes</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  itineraryDetails: state.itineraryDetails,
  userId: state.auth.id,
  user: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  getItinerary: (userId, itineraryId) =>
    dispatch(fetchItinerary(userId, itineraryId)),
  updateItinerary: (itinerary, itineraryId) =>
    dispatch(updateItinerary(itinerary, itineraryId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditItinerary);
