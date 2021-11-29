import React from 'react';

import { Link } from 'react-router-dom';

const EventCard = () => {
  let props = {
    id: 221,
    name: 'Visit Statue of Liberty',
    location: 'Liberty Island, New York, NY',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    imageUrl:
      'https://www.firstbenefits.org/wp-content/uploads/2017/10/placeholder.png',
  };

  return (
    <div className='border-2 grid gap-1 grid-cols-6'>
      <div className='col-span-1'>
        <img width={'80px'} src={props.imageUrl} />
      </div>
      <div className='col-span-5'>
        <p>{props.name}</p>
        <p>{props.location}</p>
        <p>{props.description}</p>
      </div>
      <button></button>
    </div>
  );
};

export default EventCard;
