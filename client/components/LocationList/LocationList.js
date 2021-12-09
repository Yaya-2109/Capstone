import React, { useState, useEffect, createRef } from 'react'
import { useDispatch } from 'react-redux'
import { Autocomplete } from '@react-google-maps/api'

import ListLoading from '../ListLoading/ListLoading'
import LocationDetails from '../LocationDetails/LocationDetails'
import { setCoords } from '../../store/map'

import useStyles from './styles'

const LocationList = ({ places, rating, setRating, type, setType, isLoading, childClicked }) => {

  const classes = useStyles()
  const dispatch = useDispatch()

  const [autocomplete, setAutocomplete] = useState(null)
  const [elRefs, setElRefs] = useState([])

  useEffect(() => {
    const refs = Array(places.length).fill().map((_, i) => elRefs[i] || createRef())

    setElRefs(refs)
  }, [places])

  const onLoad = autocomplete => setAutocomplete(autocomplete)

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat()
    const lng = autocomplete.getPlace().geometry.location.lng()
    dispatch(setCoords({ lat, lng }))
  }

  return (
    <div className={classes.locationListContainer}>
      <Autocomplete
        onLoad={onLoad}
        onPlaceChanged={onPlaceChanged}
      >
        <div className={classes.searchFieldContainer}>
          <label
            className={classes.searchFieldLabel}
            htmlFor='location-search'
          >
            Search
          </label>
          <input
          className={classes.searchField}
          type='text'
          placeholder='Example: Paris...'
          id='location-search'
          name='location-search'
          />
        </div>
      </Autocomplete>

      <form className={classes.filterform}>
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

        {
          isLoading || places === undefined ?
          <ListLoading />
          :
          places.map((place, i) => (
          <div ref={elRefs[i]} key={place.location_id}>
            <LocationDetails
              key={place.location_id}
              place={place}
              selected={Number(childClicked) === i}
              refProp={elRefs[i]}
              type={type}
            />
          </div>
          ))
        }
    </div>
  )
}

export default LocationList
