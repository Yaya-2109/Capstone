import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setCoords, setUserCoords } from '../../store/map'
import { getPlacesData } from '../../store/locationList'
import { setSuccess } from '../../store/notification'
import LocationList from '../LocationList/LocationList'
import SearchMap from '../SearchMap/SearchMap'
import Error from '../Error/Error'
import Success from '../Success/Success'
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
  const [error, setError] = useState(false)

  const bounds = useSelector((state) => state.map.bounds)
  const success = useSelector((state) => state.notification)

  useEffect(() => {
    setTimeout(() => {
      dispatch(setSuccess(false))
    }, 3000)
  }, [success])

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
      if(error === false) {
        getPlacesData(type, bounds.sw, bounds.ne)
          .then((data) => {

            setPlaces(data.filter((place) => {
              return place.name && place.num_reviews > 0
            }))

            setFilteredPlaces([])
            setRating(0)
            setIsLoading(false)
          })
          .catch((err) => {
            console.log(err)
            setError(true)
          })
      }
    }
  }, [bounds, type])

  return (
    <div>
      {success ? <Success parent={'searchview'} /> : null}
      <div className={classes.gridContainer}>
      {
        error ?
        <Error />
        :
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
      }
        <SearchMap
          isLoading={isLoading}
          places={
            filteredPlaces.length || rating !== 0 ? filteredPlaces : places
          }
          setChildClicked={setChildClicked}
        />
      </div>
    </div>
  )
}

export default SearchView
