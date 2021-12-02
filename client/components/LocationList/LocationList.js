import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Autocomplete } from '@react-google-maps/api'

import LocationDetails from '../LocationDetails/LocationDetails'
import { setCoords } from '../../store/map'

const LocationList = ({ places, rating, setRating, type, setType }) => {

  const dispatch = useDispatch()

  const [autocomplete, setAutocomplete] = useState(null)

  const onLoad = autocomplete => setAutocomplete(autocomplete)

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat()
    const lng = autocomplete.getPlace().geometry.location.lng()
    dispatch(setCoords({ lat, lng }))
  }

  return (
    <div>
      <h2>Location List</h2>

      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <div>
          <input type='text' placeholder="Search…" />
        </div>
      </Autocomplete>

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
