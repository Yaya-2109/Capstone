import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setCoords, setUserCoords } from '../../store/map'
import { getPlacesData } from '../../store/locationList'
import LocationList from '../LocationList/LocationList'
import SearchMap from '../SearchMap/SearchMap'
import useStyles from './styles'

const SearchView = () => {

  const classes = useStyles()

  const dispatch = useDispatch()

  const [type, setType] = useState('restaurants')
  const [rating, setRating] = useState(0)
  const [places, setPlaces] = useState([])
  const [filteredPlaces, setFilteredPlaces] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [childClicked, setChildClicked] = useState(null)

  const bounds = useSelector((state) => state.map.bounds)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: {latitude, longitude} }) => {
      dispatch(setCoords({ lat: latitude, lng: longitude }))
      dispatch(setUserCoords({ lat: latitude, lng: longitude }))
    })
  }, [])

  useEffect(() => {
    const filteredPlaces = places.filter((place) => {
      return Number(place.rating) > rating}
    )
    setFilteredPlaces(filteredPlaces)
  }, [rating])

  useEffect(() => {
    if(bounds) {
      setIsLoading(true)
      setPlaces([])
      getPlacesData(type, bounds.sw, bounds.ne)
        .then((data) => {

          setPlaces(data.filter((place) => {
            return place.name && place.num_reviews > 0
          }))

          setFilteredPlaces([])
          setRating(0)
          setIsLoading(false)
        })
    }
  }, [bounds, type])

  return (
    <div className={classes.gridContainer}>
      <LocationList
        places={
          filteredPlaces.length || rating !== 0 ? filteredPlaces : places
          }
        rating={rating}
        setRating={setRating}
        type={type}
        setType={setType}
        isLoading={isLoading}
        childClicked={childClicked}
      />
      <SearchMap
        isLoading={isLoading}
        places={
          filteredPlaces.length || rating !== 0 ? filteredPlaces : places
        }
        setChildClicked={setChildClicked}
      />
    </div>
  )
}

export default SearchView
