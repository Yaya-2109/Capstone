import React from 'react'
import LocationList from '../LocationList/LocationList'
import Map from '../Map/Map'
import useStyles from './styles'

const SearchView = () => {

  const classes = useStyles()

  return (
    <div className={classes.gridContainer}>
      <LocationList />
      <Map />
    </div>
  )
}

export default SearchView
