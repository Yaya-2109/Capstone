import React, { useState } from "react";
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";

const ChatHome = () => {
  const [roomName, setRoomName] = useState("");

  const rooms = useSelector(state => state.itineraries)

  let roomList = rooms.length > 0 && rooms.map((room, i) => {
    return (
      <option
        key={room.id}
        value={room.id}
      >
        {room.name}
      </option>
    )
  })

  return (
    <div className="home-container">
      <select
        name="rooms"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      >
        <option hidden value="">Room List</option>
        {roomList}
      </select>
      <Link to={`/livechat/${roomName}`} className="enter-room-button">
        Join room
      </Link>
    </div>
  );
};

export default ChatHome
