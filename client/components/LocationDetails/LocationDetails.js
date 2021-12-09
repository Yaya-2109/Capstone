import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { addEventToItinerary } from '../../store/itinerary'
import useStyles from './styles'

const LocationDetails = ({ place, type, selected, refProp }) => {

  const classes = useStyles()

  const [itineraryId, setItineraryId] = useState({})
  const dispatch = useDispatch()

  const itineraries = useSelector(state => state.itineraries)
  const user = useSelector(state => state.auth)

  if(refProp) {
    if(selected && refProp.current) {
      refProp.current.scrollIntoView({behavior: 'smooth', block: 'start'})
    }
  }

  const handleclick = () => {
    dispatch(addEventToItinerary({itineraryId, user, place, type}))
  }

  let itinerariesList = itineraries.length > 0 && itineraries.map((item, i) => {
    return (
      <option key={item.location_id} value={item.id}>
        {item.name}
      </option>
    )
  })

  return (
    <div className={classes.cardContainer}>
      <img
        className={classes.img}
        src={
          place.photo ?
          place.photo.images.large.url
          :
          'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
          }
        alt='location image'
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
