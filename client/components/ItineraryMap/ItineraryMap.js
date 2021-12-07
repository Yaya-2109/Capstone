import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import GoogleMapReact from 'google-map-react'

import useStyles from './styles'

const ItineraryMap = ({ places, isLoading }) => {

  const [coords, setCoords] = useState({lat: 0, lng: 0})

  console.log(places)

  useEffect(() => {
    if(places) {
      if(places.length > 0) {
        setCoords({
          lat: Number(places[0].latitude),
          lng: Number(places[0].longitude)
        })
      }
    }
  }, [places])

  return (
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyCtqFzsxrosfX7Zz2x1MEZrel9n8AN2HNo' }}
        defaultCenter={coords}
        center={coords}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{ zoomControl: true }}
        onChange={(e) => console.log(e)}
        onChildClick={(child) => console.log(child)}
      >
      {
        places.length > 0 && places.map((place, i) => (
          <div
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
            📍
          </div>
        ))
      }
      </GoogleMapReact>
  )
}

export default ItineraryMap
