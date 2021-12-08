import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Day from "../Day/Day";
import EventCard from "../EventCard/EventCard";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchItinerary, reorderItinerary } from "../../store/itinerary";
import ChatHome from "../ChatHome/ChatHome";
import ItineraryMap from "../ItineraryMap/ItineraryMap";
import useStyles from "./styles";

const Itinerary = (props) => {
  const classes = useStyles();
  const user = useSelector((state) => state.auth);
  const itinerary = useSelector((state) => state.itinerary);

  let [currentDay, updateDay] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItinerary(props.match.params.itineraryId, user.id));
  }, []);

  let dayInMillisecs =
    Date.parse(itinerary.endDate) - Date.parse(itinerary.startDate);
  let diffDays = dayInMillisecs / (1000 * 60 * 60 * 24);
  let dayArray = [];
  if (diffDays) {
    dayArray.length = diffDays;
  }
  for (let i = 0; i < dayArray.length; i++) {
    dayArray[i] = i + 1;
  }

  const dayMap = [];
  if (diffDays) {
    dayMap.length = diffDays;
  }
  for (let i = 0; i < dayMap.length; i++) {
    dayMap[i] = [];
  }
  itinerary.events &&
    itinerary.events.forEach((event) => {
      dayMap[event.itineraryEvents.day] =
        dayMap[event.itineraryEvents.day] || [];
      dayMap[event.itineraryEvents.day].push(event);
    });

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    if (
      result.destination.droppableId === "assignedTasks" &&
      result.source.droppableId === "assignedTasks"
    ) {
      dayMap[currentDay].forEach((item) => {
        // Moving events position < updated position (Case 1: Drag down)
        if (
          dayMap[currentDay][result.source.index - 1].itineraryEvents.position <
          result.destination.index + 1
        ) {
          console.log(dayMap[currentDay][result.source.index - 1]);
          // item position < updated position and item position > starting position
          if (
            item.itineraryEvents.position <= result.destination.index &&
            item.itineraryEvents.position > result.source.index
          ) {
            // Subtract one from the items position
            item.itineraryEvents.position = item.itineraryEvents.position - 1;
            // else if item position >= updated position
          }
          // Moving events position < updated position (Case 2: Drag Up)
        } else if (
          dayMap[currentDay][result.source.index - 1].itineraryEvents.position >
          result.destination.index
        ) {
          // item position <= starting position and item position >= updated position
          if (
            item.itineraryEvents.position < result.source.index &&
            item.itineraryEvents.position >= result.destination.index
          ) {
            // item position = +1 its position
            item.itineraryEvents.position = item.itineraryEvents.position + 1;
          }
        }
      });
      // Finally, update the moving events position to the updated position
      dayMap[currentDay][result.source.index - 1].itineraryEvents.position =
        result.destination.index;
    } // Moving objects to unassigned
    if (
      result.source.droppableId === "unassignedTasks" &&
      result.destination.droppableId === "unassignedTasks"
    ) {
      return;
    }
    if (
      result.source.droppableId === "unassignedTasks" &&
      result.destination.droppableId === "assignedTasks"
    ) {
      Array.isArray(dayMap) &&
        dayMap[currentDay].forEach((item) => {
          if (item.itineraryEvents.position >= result.destination.index) {
            item.itineraryEvents.position = item.itineraryEvents.position + 1;
          }
        });
      if (dayMap[currentDay].length !== 0) {
        dayMap[0][result.source.index].itineraryEvents.position =
          result.destination.index;
        dayMap[0][result.source.index].itineraryEvents.day = currentDay;
      } else {
        dayMap[0][result.source.index].itineraryEvents.position = 1;
        dayMap[0][result.source.index].itineraryEvents.day = currentDay;
      }
    }
    if (
      result.destination.droppableId === "unassignedTasks" &&
      result.source.droppableId === "assignedTasks"
    ) {
      // Loop through the objects
      Array.isArray(dayMap) &&
        dayMap[currentDay].forEach((item) => {
          if (item.itineraryEvents.position > result.source.index) {
            item.itineraryEvents.position = item.itineraryEvents.position - 1;
          }
        });
      dayMap[currentDay][result.source.index - 1].itineraryEvents.position =
        null;
      dayMap[currentDay][result.source.index - 1].itineraryEvents.day = 0;
    }
    // console.log(tripObj);
    // const changingEvent = tripObj.day1.events[result.source.index];
    // console.log("eventToUpdate:", changingEvent);
    // console.log(result);
    // console.log('result.source: ', result.source);
    // console.log('result.destination: ', result.destination);
    const updatedItineraryEvents =
      dayMap[currentDay] &&
      dayMap[currentDay].map((event) => {
        return event.itineraryEvents;
      });
    const massgedData = () => {
      if (dayMap[0]) {
        const updatedDay0Events =
          dayMap[0] &&
          dayMap[0].map((event) => {
            return event.itineraryEvents;
          });
        return [...updatedItineraryEvents, ...updatedDay0Events];
      }
      return updatedItineraryEvents;
    };
    // Pass it to the backend for updating
    updatedItineraryEvents.sort((a, b) => {
      return a.position - b.position;
    });
    dayMap[currentDay].sort((a, b) => {
      return a.itineraryEvents.position - b.itineraryEvents.position;
    });
    dispatch(reorderItinerary(massgedData()));
  }
  return (
    <div className={classes.viewContainer}>
      <div className={classes.daysContainer}>
        <label className="my-1 text-gray-400">Day</label>
        {dayArray.map((day) => {
          return (
            <button
              key={day}
              onClick={() => updateDay(day)}
              className="px-2 m-1 border-2 block rounded-md text-gray-400 hover:text-purple-400 hover:border-purple-400"
            >
              {day}
            </button>
          );
        })}
      </div>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className={classes.itineraryDnD}>
          <Droppable droppableId="assignedTasks">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {dayMap[currentDay]
                  ? dayMap[currentDay].map((trip, index) => {
                      // console.log(trip.name, trip.itineraryEvents.position)
                      if (trip.itineraryEvents.position !== null)
                        return (
                          <Draggable
                            key={trip.id}
                            draggableId={String(trip.id)}
                            index={trip.itineraryEvents.position}
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
                  : "No events for this day"}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </div>

        {itinerary.events ? (
          <div className={classes.mapContainer}>
            <ItineraryMap places={itinerary.events} />
          </div>
        ) : null}

        <div className={classes.unassigned}>
          <div className="flex w-full my-2 border-b justify-between border-purple-400 flex-row">
            <div className="text-purple-400 font-light font-lg">Unassigned</div>
            <div className="text-purple-400 mx-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M5 12a1 1 0 102 0V6.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L5 6.414V12zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
              </svg>
            </div>
          </div>

          <div className="">
            <Droppable droppableId="unassignedTasks">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className=""
                >
                  {dayMap[0]
                    ? dayMap[0].map((trip, index) => {
                        if (trip.itineraryEvents.position === null)
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
                                  className=""
                                >
                                  <EventCard
                                    id={trip.id}
                                    name={trip.name}
                                    location={trip.location}
                                    imageUrl={trip.imageUrl}
                                    trip={trip}
                                  />
                                </div>
                              )}
                            </Draggable>
                          );
                      })
                    : "Place events here if you need to move them to another day!"}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>

        <div className={classes.chat}>
          <ChatHome />
        </div>
      </DragDropContext>
    </div>
  );
};

export default Itinerary;
