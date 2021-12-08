import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { addEventToItinerary } from '../../store/itinerary'
import useStyles from './styles'

const LocationDetails = ({place}) => {

  const classes = useStyles()

  const [itineraryId, setItineraryId] = useState({})
  const dispatch = useDispatch()

  const itineraries = useSelector(state => state.itineraries)
  const user = useSelector(state => state.auth)


  const handleclick = () => {
    dispatch(addEventToItinerary({itineraryId, user, place}))
  }


  let itinerariesList = itineraries.length > 0 && itineraries.map((item, i) => {
    return (
      <option key={item.location_id} value={item.id}>
        {item.name}
      </option>
    )
  })

  console.log(place)

  return (
    <div className={classes.cardContainer}>
      <img
        className={classes.img}
        src={place.photo.images.large.url}
        alt='restaurant image'
      />
        <p>Name: {place.name}</p>
        <p>Rating: {place.rating} out of 5</p>
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
        setItineraryId(e.target.value)}
      >
        <option hidden value="">Itinerary List</option>
        {itinerariesList}
      </select>
      <button
        className={classes.button}
        onClick={handleclick}>
        Add To Selected Itinerary
      </button>
    </div>
  )
}

export default LocationDetails
