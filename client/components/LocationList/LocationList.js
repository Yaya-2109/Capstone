import React from 'react'
import LocationDetails from '../LocationDetails/LocationDetails'

const LocationList = ({ places, type, setType, rating, setRating}) => {

  return (
    <div>
      <h2>Location List</h2>
      <form>
        <label>Type</label>
        <select name="type" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="restaurants">Restaurants</option>
          <option value="hotels">Hotels</option>
          <option value="attractions">Attractions</option>
        </select>
        <label>Rating</label>
        <select name="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value={0}>All</option>
          <option value={3}>Above 3.0</option>
          <option value={4}>Above 4.0</option>
          <option value={4.5}>Above 4.5</option>
        </select>
      </form>

      <ul>

        {
          places.map((place, i) => (
          <LocationDetails key={place.location_id} place={place} />
          ))
        }
      </ul>
    </div>
  )
}

export default LocationList
