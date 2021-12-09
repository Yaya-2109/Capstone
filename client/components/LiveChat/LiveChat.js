import React from 'react';
import { useSelector } from 'react-redux';

import useChat from './useChat';

const LiveChat = (props) => {
  const { roomId } = props.roomId // Gets roomId from URL
  const { messages, sendMessage } = useChat(roomId); // Creates a websocket and manages messaging
  const [newMessage, setNewMessage] = React.useState(''); // Message to be sent
  const userFirstName = useSelector((state) => state.auth.firstName);

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage, userFirstName);
    setNewMessage('');
  };
  // border border-gray-200 border-solid rounded h-1/4
  return (
    <div className='flex flex-col m-4 w-full'>
      <h1 className='mt-0'>Room: {roomId}</h1>
      <div className='h-52 border border-gray-400 border-solid rounded overflow-auto mb-1'>
        <ol className='list-none p-0'>
          {messages.map((message, i) => (
            <div
              className={`flex flex-col m-1.5 ${
                message.ownedByCurrentUser ? 'items-end' : 'items-start'
              }`}
            >
              <h6 className='text-xs text-gray-400'>{message.userFirstName}</h6>
              <li
                key={i}
                className={`rounded text-white ${
                  message.ownedByCurrentUser
                    ? 'bg-blue-600 ml-auto text-sm px-1 py-0.5'
                    : 'bg-gray-800 mr-auto text-sm px-1 py-0.5'
                }`}
              >
                {message.body}
              </li>
            </div>
          ))}
        </ol>
      </div>
      <textarea
        value={newMessage}
        onChange={handleNewMessageChange}
        placeholder='Write message...'
        className='h-18 text-sm resize-none bg-gray-100 p-1 border rounded'
      />
      <button
        onClick={handleSendMessage}
        className='mt-3 text-base bg-green-400 text-white font-semibold text-center no-underline rounded-md'
      >
        Send
      </button>
    </div>
  );
};

export default LiveChat
