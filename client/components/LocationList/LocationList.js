import React, { useEffect, useState, createRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPlacesData } from '../../store/locationList'
import LocationDetails from '../LocationDetails/LocationDetails'
import { setCoords, setUserCoords } from '../../store/map'

const LocationList = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [type, setType] = useState('restaurants')
  const [rating, setRating] = useState(0)
  const [elRefs, setElRefs] = useState([])

  const dispatch = useDispatch()

  const places = useSelector((state) => state.locationList)
  const bounds = useSelector((state) => state.map.bounds)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: {latitude, longitude} }) => {
      dispatch(setCoords({ lat: latitude, lng: longitude }))
      dispatch(setUserCoords({ lat: latitude, lng: longitude }))
    })
  }, [])

  useEffect(() => {
    if(bounds) {
      dispatch(getPlacesData(type, bounds.sw, bounds.ne ))
    }
      // setRating('');
      // return () => {setBounds({})}
  }, [bounds])

  useEffect(() => {
    const refs = Array(places?.length).fill().map((_, i) => elRefs[i] || createRef())

    setElRefs(refs)
  }, [places])

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
        {places.map((place, i) => (
          <LocationDetails key={place.location_id} place={place} />
        ))}
      </ul>
    </div>
  )
}

export default LocationList
