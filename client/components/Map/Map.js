import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import GoogleMapReact from 'google-map-react'

import useStyles from './styles'
import { setCoords, setBounds } from '../../store/map'

const Map = ({ places }) => {

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
        onChange={(e) => {
          dispatch(setCoords({ lat: e.center.lat, lng: e.center.lng}))
          dispatch(setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw }))
        }}
        onChildClick={(child) => console.log(child)}
      >
        {
          places.map((place, i) => (
          <div
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
            📍
          </div>
        ))}
      </GoogleMapReact>

    </div>
  )
}

export default Map
