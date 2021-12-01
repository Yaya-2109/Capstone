import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import LocationList from '../LocationList/LocationList'
import Map from '../Map/Map'
import useStyles from './styles'
import { setCoords, setUserCoords } from '../../store/map'
import { getPlacesData } from '../../store/locationList'

const SearchView = () => {

  const classes = useStyles()
  const [type, setType] = useState('restaurants')
  const [rating, setRating] = useState(0)

  const dispatch = useDispatch()

  const bounds = useSelector((state) => state.map.bounds)
  const places = useSelector((state) => state.locationList)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: {latitude, longitude} }) => {
      dispatch(setCoords({ lat: latitude, lng: longitude }))
      dispatch(setUserCoords({ lat: latitude, lng: longitude }))
    })
  }, [])

  useEffect(() => {
    if(bounds) {
      dispatch(getPlacesData(type, bounds.sw, bounds.ne))
      setRating(0)
    }
  }, [bounds, type])

  let filteredPlaces = []

  useEffect(() => {
    console.log(rating)
    filteredPlaces = places.filter((place) => Number(place.rating) > rating)
    console.log(filteredPlaces)
  }, [rating])

  return (
    <div className={classes.gridContainer}>
      <LocationList
        places={filteredPlaces.length ? filteredPlaces : places}
        type={type}
        setType={setType}
        rating={rating}
        setRating={setRating}
      />
      <Map
        places={filteredPlaces.length ? filteredPlaces : places}
      />
    </div>
  )
}

export default SearchView
