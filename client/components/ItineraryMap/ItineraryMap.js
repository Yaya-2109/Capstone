import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import GoogleMapReact from 'google-map-react'

import useStyles from './styles'

const ItineraryMap = () => {

  const classes = useStyles()
  const dispatch = useDispatch()

  const coords = useSelector((state) => state.map.coords)
  const userCoords = useSelector((state) => state.map.userCoords)

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyCtqFzsxrosfX7Zz2x1MEZrel9n8AN2HNo' }}
        defaultCenter={userCoords}
        center={coords}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{ zoomControl: true, }}
        onChange={(e) => {console.log(e)}}
        onChildClick={(child) => console.log(child)}
      >
      </GoogleMapReact>
    </div>
  )
}

export default ItineraryMap
