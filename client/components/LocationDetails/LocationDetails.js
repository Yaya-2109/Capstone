import React from 'react'

const LocationDetails = ({place}) => {

  return (
    <>
      <li>
        <p>Name: {place.name}</p>
        <p>Rating: {place.rating}</p>
        <p>Location: {place.address}</p>
      </li>
      <br></br>
    </>
  )
}

export default LocationDetails
