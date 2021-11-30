import React, { useEffect } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Day from "../Day/Day";
import EventCard from "../EventCard/EventCard";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState } from "react";

let socket;
const connection = "localhost:8080/"


const sendMessage = () => {

  let messageContent = {
    content: {
      author: userName,
      message: message
    }
  }

  socket.emit("send_message", messageContent);
  setMessageList([...messageList, messageContent.content])
  setMessage("");
}

const trips = [
  {
    id: 1,
    name: "Visit Statue of Liberty",
    location: "Liberty Island, New York, NY",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageUrl:
      "https://a.cdn-hotels.com/gdcs/production6/d1738/3c1a71e7-0a73-4810-9935-5c4daea1954e.jpg?impolicy=fcrop&w=800&h=533&q=medium",
    attendees:
      "https://t3.ftcdn.net/jpg/02/22/85/16/360_F_222851624_jfoMGbJxwRi5AWGdPgXKSABMnzCQo9RN.jpg",
  },
  {
    id: 2,
    name: "Visit the Met Museum",
    location: "5 Museum Mile, New York, NY",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageUrl:
      "http://www.metmuseum.org/-/media/images/visit/met-fifth-avenue/fifthave_teaser.jpg?sc_lang=en",
    attendees:
      "https://t3.ftcdn.net/jpg/02/22/85/16/360_F_222851624_jfoMGbJxwRi5AWGdPgXKSABMnzCQo9RN.jpg",
  },
  {
    id: 3,
    name: "Visit Freedom Tower",
    location: "Liberty Island, New York, NY",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageUrl:
      "https://www.nydailynews.com/resizer/EsyO7of502AOt3lM9wrqf4NCYOk=/1200x0/top/arc-anglerfish-arc2-prod-tronc.s3.amazonaws.com/public/SUNBWE47ACEVH67NCDESD2RHJ4.jpg",
    attendees:
      "https://t3.ftcdn.net/jpg/02/22/85/16/360_F_222851624_jfoMGbJxwRi5AWGdPgXKSABMnzCQo9RN.jpg",
  },
  {
    id: 4,
    name: "Have Dinner at Lucalis",
    location: "5 Evans Street, New York, NY",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageUrl:
      "https://infatuation.imgix.net/media/images/reviews/lucali/TeddyWolff.Lucali.Interiors.16.jpg?auto=format&w=256",
    attendees:
      "https://t3.ftcdn.net/jpg/02/22/85/16/360_F_222851624_jfoMGbJxwRi5AWGdPgXKSABMnzCQo9RN.jpg",
  },
];

const unassignedTrips = [
  {
    id: 225,
    name: "Walk in Central Park",
    location: "Central Park",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageUrl:
      "https://assets.centralparknyc.org/media/images/_1650x767_crop_center-center_none/Bethesda-Terrace_20190515_002.jpg",
    attendees:
      "https://t3.ftcdn.net/jpg/02/22/85/16/360_F_222851624_jfoMGbJxwRi5AWGdPgXKSABMnzCQo9RN.jpg",
  },
  {
    id: 226,
    name: "See Phantom of The Opera",
    location: "Majestic Theatre",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageUrl:
      "https://static.wikia.nocookie.net/sexypedia/images/f/f8/Phantom.jpg",
    attendees:
      "https://t3.ftcdn.net/jpg/02/22/85/16/360_F_222851624_jfoMGbJxwRi5AWGdPgXKSABMnzCQo9RN.jpg",
  },
];

const Itinerary = () => {
  let [tripList, updateTripList] = useState(trips);
  let [unassigned, updateUnassigned] = useState(unassignedTrips);
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [userName, setUserName] = useState("Derrick");

  useEffect(() => {
    socket = io(connection);
  }, [connection]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList([...messageList, data])
    })
  })

  const tripObj = {
    day1: tripList,
    unassigned: unassigned,
  };
  const tripObjMethods = {
    day1: updateTripList,
    unassigned: updateUnassigned,
  };
  function handleOnDragEnd(result) {
    console.log(result);
    if (!result.destination) return;

    const items = trips;
    const [reorderedItem] = tripObj[result.source.droppableId].splice(
      result.source.index,
      1
    );
    tripObj[result.destination.droppableId].splice(
      result.destination.index,
      0,
      reorderedItem
    );
    // updateTripList(items);
    tripObjMethods[result.source.droppableId](
      tripObj[result.source.droppableId]
    );
    tripObjMethods[result.destination.droppableId](
      tripObj[result.destination.droppableId]
    );
  }

  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="grid m-3 gap-6 grid-cols-12">
          <div className="flex flex-col col-span-6 ">
            <div className="my-2 flex space-around">
              <button className="p-2 border-2 block rounded-md">Day 1</button>
              <button className="p-2 border-2 block rounded-md">Day 2</button>
              <button className="p-2 border-2 block rounded-md">Day 3</button>
            </div>

            <div className="flex">
              <Droppable droppableId="day1">
                {(provided) => (
                  <ul {...provided.droppableProps} ref={provided.innerRef}>
                    {tripList.map((trip, index) => {
                      return (
                        <Draggable
                          key={trip.id}
                          draggableId={String(trip.id)}
                          index={index}
                        >
                          {(provided) => (
                            <li
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              className="inline-block"
                            >
                              <EventCard
                                id={trip.id}
                                name={trip.name}
                                location={trip.location}
                                description={trip.description}
                                imageUrl={trip.imageUrl}
                                attendees={trip.attendees}
                              />
                            </li>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </div>
          </div>

          <div className="col-span-6 p-6 flex items-center">
            <img
              src="https://www.tripsavvy.com/thmb/1OWt6nE-xYX5v9CkEkHSbL4cRCg=/882x766/filters:fill(auto,1)/Google-Maps-5--58e4125e5f9b58ef7e4c582d.png"
              alt="New York"
            />
          </div>
        </div>

        <div>
          <h2 className="font-semibold underline">Unassigned:</h2>
          <div className="grid m-3 grid-cols-12">
            <div className="flex col-span-12">
              <Droppable droppableId="unassigned">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="flex flex-row space-even"
                  >
                    {unassignedTrips.map((trip, index) => {
                      return (
                        <Draggable
                          key={trip.id}
                          draggableId={String(trip.id)}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              className="w-1/6 h-12"
                            >
                              <EventCard
                                id={trip.id}
                                name={trip.name}
                                location={trip.location}
                                imageUrl={trip.imageUrl}
                              />
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        </div>
      </DragDropContext>
      <div className="message-container">
      <div className="messages">
            {messageList.map((val, key) => {
              return (<h1>{val.author} {val.message}</h1>)
            })}
      </div>
        <div className="messageInputs">
          <input type="text" className="messageInput" onChange={(e) => setMessage(e.target.value)} />
            <button onClick={sendMessage} className="send-button">Send</button>
        </div>
      </div>
    </>
  );
};

// const mapStateToProps = (state) => ({});
// const mapDispatchToProps = (dispatch) => ({});

// export default connect(mapStateToProps, mapDispatchToProps)(Itinerary);

export default Itinerary;
