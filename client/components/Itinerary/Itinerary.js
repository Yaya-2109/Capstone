import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Day from "../Day/Day";
import EventCard from "../EventCard/EventCard";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchItinerary, reorderItinerary } from "../../store/itinerary";

let trips = [];
let unassignedTrips = [];

const Itinerary = (props) => {
  const user = useSelector((state) => state.auth);
  const itinerary = useSelector((state) => state.itinerary)

  let [tripList, updateTripList] = useState(itinerary);
  let [unassigned, updateUnassigned] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItinerary(props.match.params.itineraryId, user.id));
  }, [tripList]);

  const tripObj = {
    day1: tripList,
    unassigned: unassigned,
  };
  const tripObjMethods = {
    day1: updateTripList,
    unassigned: updateUnassigned,
  };
  function handleOnDragEnd(result) {
    // console.log(result);
    // updateTripList(itinerary);
    // console.log(
    //   "tripObj[result.source.droppableId]",
    //   tripObj[result.source.droppableId]
    // );
    // console.log("result.source.index", result.source.index);
    if (!result.destination) return;

    const [reorderedItem] = tripObj[result.source.droppableId].events.splice(
      result.source.index,
      1
    );

    let events = tripObj[result.destination.droppableId].events;

    events.splice(result.destination.index, 0, reorderedItem);

    dispatch(reorderItinerary(itinerary, events));
    updateTripList(events);
    // tripObjMethods[result.source.droppableId](
    //   tripObj[result.source.droppableId]
    // );
    // tripObjMethods[result.destination.droppableId](
    //   tripObj[result.destination.droppableId]
    // );
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
                    {itinerary.events
                      ? itinerary.events.map((trip, index) => {
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
                                    trip={trip}
                                    itinerary={itinerary}
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
                        })
                      : "Add some events, your itinerary is looking boring"}
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
                    {unassignedTrips &&
                      unassignedTrips.map((trip, index) => {
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
    </>
  );
};

// const mapStateToProps = (state) => ({});
// const mapDispatchToProps = (dispatch) => ({});

// export default connect(mapStateToProps, mapDispatchToProps)(Itinerary);

export default Itinerary;
