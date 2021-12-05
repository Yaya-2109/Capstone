import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { addEventToItinerary } from '../../store/itinerary'

const LocationDetails = ({place}) => {

  const [itineraryId, setItinerary] = useState({})
  const dispatch = useDispatch()

  const itineraries = useSelector(state => state.itineraries)
  const user = useSelector(state => state.auth)

  let itinerariesList = itineraries.length > 0 && itineraries.map((item, i) => {
    return (
      <option key={item.location_id} value={item.id}>
        {item.name}
      </option>
    )
  })

  const handleclick = () => {
    dispatch(addEventToItinerary({itineraryId, user, place}))
  }

  return (
    <div>
        <p>Name: {place.name}</p>
        <p>Rating: {place.rating}</p>
        {
          place.address ?
            <p>Location: {place.address}</p>
            :
            <p>Location: {place.location_string}</p>
        }
      <br></br>
      <label>Select an Itinerary</label>
      <select
        name="itineraries"
        value={itineraryId}
        onChange={(e) =>
        setItinerary(e.target.value)}
      >
        <option hidden value="">Itinerary List</option>
        {itinerariesList}
      </select>
      <button onClick={handleclick}>Add To Selected Itinerary</button>
    </div>
  )
}

export default LocationDetails
