import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LiveChat from '../LiveChat/LiveChat';

const ChatHome = () => {
  const [roomId, setRoomId] = useState('');
  const [toggle, setToggle] = useState(false);

  const rooms = useSelector((state) => state.itineraries);

  let roomList =
    rooms.length > 0 &&
    rooms.map((room) => {
      return (
        <option key={room.id} value={room.id} className='text-base'>
          {room.name}
        </option>
      );
    });

  return (
    <div className='mr-10 mb-6 w-1/6 flex flex-col fixed bottom-0 right-0 z-10'>
      {toggle ? (
        <>
          <div className='flex flex-col align-center'>
            <LiveChat roomId={roomId} />
            <button
              onClick={() => setToggle(!toggle)}
              className='mt-3 text-base bg-gray-600 text-white font-semibold text-center no-underline rounded-md'
            >
              Select a Different Room
            </button>
          </div>
        </>
      ) : (
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
            className='mt-3 text-base bg-green-400 text-white font-semibold text-center no-underline rounded-md'
          >
            Join Chat Room
          </button>
        </>
      )}
    </div>
  );
};

export default ChatHome;
