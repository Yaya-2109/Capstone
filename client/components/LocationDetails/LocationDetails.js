import React from 'react'

const LocationDetails = ({place}) => {

  return (
    <div>
        <p>Name: {place.name}</p>
        <p>Rating: {place.rating}</p>
        {
          place.address ?
            <p>Location: {place.address}</p>
            :
            <p>Location: {place.location_string}</p>
        }
      <br></br>
    </div>
  )
}

export default LocationDetails
