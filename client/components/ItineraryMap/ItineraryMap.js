import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import GoogleMapReact from 'google-map-react'

import useStyles from './styles'

const ItineraryMap = ({ places, isLoading }) => {

  const [coords, setCoords] = useState({lat: 0, lng: 0})

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
            <svg className="w-6 h-6" fill="green" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
          </div>
        ))
      }
      </GoogleMapReact>
  )
}

export default ItineraryMap
