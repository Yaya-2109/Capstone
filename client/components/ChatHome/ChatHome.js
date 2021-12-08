import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LiveChat from '../LiveChat/LiveChat';

const ChatHome = () => {
  const [roomId, setRoomId] = useState('');
  const [toggle, setToggle] = useState(false)

  const rooms = useSelector((state) => state.itineraries);

  let roomList = rooms.length > 0 && rooms.map((room) => {
    return (
      <option key={room.id} value={room.id}>
        {room.name}
      </option>
    )
  })

  console.log(toggle)

  return (
    <div className='w-1/6 flex flex-col'>
      {
        toggle ?
        <>
          <LiveChat roomId={roomId} />
          <button
              onClick={() => setToggle(!toggle)}
              className='mt-5 text-xl bg-green-400 text-white font-semibold text-center no-underline rounded-md'
            >
            Select a Different Room
            </button>
        </>
        :
        <>
          <select
            name='rooms'
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          >
          <option hidden value=''>
            Room List
          </option>
          {roomList}
          </select>
          <button
            onClick={() => setToggle(!toggle)}
            className='mt-5 text-xl bg-green-400 text-white font-semibold text-center no-underline rounded-md'
          >
          Join room
          </button>
        </>
      }
    </div>
  );
};

export default ChatHome;
