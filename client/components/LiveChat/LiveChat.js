import React from "react";
import { useSelector } from "react-redux";

import useChat from "./useChat";

const LiveChat = (props) => {
  const { roomId } = props.match.params; // Gets roomId from URL
  const { messages, sendMessage } = useChat(roomId); // Creates a websocket and manages messaging
  const [newMessage, setNewMessage] = React.useState(""); // Message to be sent
  const userFirstName = useSelector(state => state.auth.firstName)

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage, userFirstName);
    setNewMessage("");
  };

  return (
    <div className="chat-room-container">
      <h1 className="room-name">Room: {roomId}</h1>
      <div className="messages-container">
        <ol className="messages-list">
          {messages.map((message, i) => (
            <>
            {message.userFirstName}
            <li
              key={i}
              className={`message-item ${
                message.ownedByCurrentUser ? "my-message" : "received-message"
              }`}
            >
              {message.body}
            </li>
            </>
          ))}
        </ol>
      </div>
      <textarea
        value={newMessage}
        onChange={handleNewMessageChange}
        placeholder="Write message..."
        className="new-message-input-field"
      />
      <button onClick={handleSendMessage} className="send-message-button">
        Send
      </button>
    </div>
  );
};

export default LiveChat;

// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client'

// import useStyles from './styles'

// const LiveChat = () => {

//   const socket = io("http://localhost:8080/chat");

//   socket.on("connection", () => {
//     console.log("connected");
//   });

//   const classes = useStyles()

//   const [text, setText] = useState('')

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     console.log(text)
//   }

//   return (
//     <div
//       className="fixed w-full bg-green-400 h-16 pt-2 text-white flex justify-between shadow-md"
//     >

//       {/* messages */}
//       <div className="mt-20 mb-16">

//         {/* <!-- SINGLE MESSAGE --> */}
//         <div className="clearfix">
//           <div
//             className="bg-gray-300 w-3/4 mx-4 my-2 p-2 rounded-lg"
//           >
//           this is a basic mobile chat layout, build with tailwind css
//           </div>
//         </div>

//         <form
//           className="fixed w-full flex justify-between bg-green-100"
//           style={{bottom: "0px"}}
//           onSubmit={handleSubmit}
//         >
//           <label>Type a message below</label>
//           <input
//           className="flex-grow m-2 py-2 px-4 mr-1 rounded-full border border-gray-300 bg-gray-200 resize-none"
//           rows="1"
//           placeholder="Message..."
//           style={{outline: "none"}}
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           />
//           <button className="m-2" style={{outline: "none"}}>
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default LiveChat
