import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Day from '../Day/Day';
import EventCard from '../EventCard/EventCard';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchItinerary, reorderItinerary } from '../../store/itinerary';

let trips = [];
let unassignedTrips = [];

const Itinerary = (props) => {
  const user = useSelector((state) => state.auth);
  const itinerary = useSelector((state) => state.itinerary);

  let [tripList, updateTripList] = useState(itinerary);
  let [unassigned, updateUnassigned] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItinerary(props.match.params.itineraryId, user.id));
  }, [tripList]);

  const tripObj = {
    day1: itinerary,
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

    // result.source = obj {index, droppableId}
    // index = grabbed event position in container
    // droppableId = name of container column
    console.log(tripObj);
    tripObj.day1.events.forEach((item) => {
      // Moving events position < updated position
      if (
        tripObj.day1.events[result.source.index].itineraryEvents.position <
        result.destination.index + 1
      ) {
        // item position < updated position and item position > starting position
        if (
          // Case 1
          item.itineraryEvents.position <= result.destination.index + 1 &&
          item.itineraryEvents.position >= result.source.index + 1
        ) {
          // Subtract one from the items position
          console.log("Case 1: ", item.name, " losing one and ", tripObj.day1.events[result.source.index], "gets position ", result.destination.index + 1)
          item.itineraryEvents.position = item.itineraryEvents.position - 1;
          // else if item position >= updated position
        }
        // else if moving events position == null
        if (
          tripObj.day1.events[result.source.index].itineraryEvents.position ===
          null
        ) {
          // if item position >= updated position
          if (item.itineraryEvents.position >= result.destination.index + 1) {
            // item position = +1 its position
            console.log("If this is firing somethings wrong!, null case");
            item.itineraryEvents.position = item.itineraryEvents.position + 1;
            // Moving events position = updated position
            tripObj.day1.events[result.source.index].itineraryEvents.position =
              result.destination.index + 1;
          }
          // Moving events position = updated position
          console.log("this shouldnt fire either, null case");
          tripObj.day1.events[result.source.index].itineraryEvents.position =
            result.destination.index + 1;
        }
      }
      if (
        item.itineraryEvents.position < result.source.index + 1 &&
        item.itineraryEvents.position >= result.destination.index + 1
      ) {
        item.itineraryEvents.position = item.itineraryEvents.position + 1;
        tripObj.day1.events[result.source.index].itineraryEvents.position =
          result.destination.index + 1;
      }
    });
    // Update the moving events position to the updated position
    tripObj.day1.events[result.source.index].itineraryEvents.position =
    result.destination.index + 1;
    console.log(tripObj);
    // const changingEvent = tripObj.day1.events[result.source.index];
    // console.log("eventToUpdate:", changingEvent);
    console.log('result.source: ', result.source);
    console.log('result.destination: ', result.destination);

    // const updatedPosition = result.destination.index
    // console.log("updatedPosition: ", updatedPosition)

    // dispatch(reorderItinerary(changingEvent, updatedPosition));
    // updateTripList(events);
    // tripObjMethods[result.source.droppableId](
    //   tripObj[result.source.droppableId]
    // );
    // tripObjMethods[result.destination.droppableId](
    //   tripObj[result.destination.droppableId]
    // );
    const updatedItineraryEvents =
      tripObj.day1.events &&
      tripObj.day1.events.map((event) => {
        return event.itineraryEvents;
      });
    // console.log('UPDATED ITINERARY EVENTS: ', updatedItineraryEvents);
    dispatch(reorderItinerary(updatedItineraryEvents));
  }

  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className='grid m-3 gap-6 grid-cols-12'>
          <div className='flex flex-col col-span-6 '>
            <div className='my-2 flex space-around'>
              <button className='p-2 border-2 block rounded-md'>Day 1</button>
              <button className='p-2 border-2 block rounded-md'>Day 2</button>
              <button className='p-2 border-2 block rounded-md'>Day 3</button>
            </div>

            <div className='flex'>
              <Droppable droppableId='day1'>
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
                                  className='inline-block'
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
                      : 'Add some events, your itinerary is looking boring'}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </div>
          </div>

          <div className='col-span-6 p-6 flex items-center'>
            <img
              src='https://www.tripsavvy.com/thmb/1OWt6nE-xYX5v9CkEkHSbL4cRCg=/882x766/filters:fill(auto,1)/Google-Maps-5--58e4125e5f9b58ef7e4c582d.png'
              alt='New York'
            />
          </div>
        </div>

        <div>
          <h2 className='font-semibold underline'>Unassigned:</h2>
          <div className='grid m-3 grid-cols-12'>
            <div className='flex col-span-12'>
              <Droppable droppableId='unassigned'>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className='flex flex-row space-even'
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
                                className='w-1/6 h-12'
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
