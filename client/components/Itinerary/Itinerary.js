import React from "react";
import { connect } from "react-redux";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Day from "../Day/Day";
import EventCard from "../EventCard/EventCard";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState } from "react";

const trips = [
  {
    id: 221,
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
    id: 222,
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
    id: 223,
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
    id: 224,
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

const Itinerary = () => {
  let [tripList, updateTripList] = useState(trips);
  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = trips;
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    updateTripList(items);
  }

  return (
    <>
      <div className="grid m-3 gap-6 grid-cols-12">
        <div className="flex flex-col col-span-6 ">
          <div className="my-2 flex space-around">
            <button className="p-2 border-2 block rounded-md">Day 1</button>
            <button className="p-2 border-2 block rounded-md">Day 2</button>
            <button className="p-2 border-2 block rounded-md">Day 3</button>
          </div>

          <div className="flex">
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="trips">
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
            </DragDropContext>
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
        <div className="grid m-3 gap-6 grid-cols-12">
          <div className="flex col-span-12">
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="trips">
                {(provided) => (
                  <ul
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="flex flex-row"
                  >
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
                            >
                              <EventCard
                                id={trip.id}
                                name={trip.name}
                                location={trip.location}
                                imageUrl={trip.imageUrl}
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
            </DragDropContext>
          </div>
        </div>
      </div>
    </>
  );
};

// const mapStateToProps = (state) => ({});
// const mapDispatchToProps = (dispatch) => ({});

// export default connect(mapStateToProps, mapDispatchToProps)(Itinerary);

export default Itinerary;
