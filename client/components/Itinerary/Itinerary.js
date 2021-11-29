import React from 'react';
import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Day from '../Day/Day';
import EventCard from '../EventCard/EventCard';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useState } from 'react';

const trips = [
  {
    id: 221,
    name: 'Visit Statue of Liberty',
    location: 'Liberty Island, New York, NY',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    imageUrl:
      'https://a.cdn-hotels.com/gdcs/production6/d1738/3c1a71e7-0a73-4810-9935-5c4daea1954e.jpg?impolicy=fcrop&w=800&h=533&q=medium',
  },
  {
    id: 222,
    name: 'Visit the Met Museum',
    location: '5 Museum Mile, New York, NY',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    imageUrl:
      'http://www.metmuseum.org/-/media/images/visit/met-fifth-avenue/fifthave_teaser.jpg?sc_lang=en',
  },
  {
    id: 223,
    name: 'Visit Freedom Tower',
    location: 'Liberty Island, New York, NY',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    imageUrl:
      'https://www.nydailynews.com/resizer/EsyO7of502AOt3lM9wrqf4NCYOk=/1200x0/top/arc-anglerfish-arc2-prod-tronc.s3.amazonaws.com/public/SUNBWE47ACEVH67NCDESD2RHJ4.jpg',
  },
  {
    id: 224,
    name: 'Have Dinner at Lucalis',
    location: '5 Evans Street, New York, NY',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    imageUrl:
      'https://infatuation.imgix.net/media/images/reviews/lucali/TeddyWolff.Lucali.Interiors.16.jpg?auto=format&w=256',
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
    <div className='m-4'>
      <div className='flex justify-around'>
        <div className='flex-column'>
          <div className='flex-column'>
            <div className='flex mb-6'>
              <h1 className='w-16 h-8 mx-3 bg-gray-100 border-black border-solid border text-center font-semibold shadow cursor-pointer hover:shadow-lg'>
                Day 1
              </h1>
              <h1 className='w-16 h-8 mx-3 bg-gray-100 border-black border-solid border text-center font-semibold shadow cursor-pointer hover:shadow-lg'>
                Day 2
              </h1>
              <h1 className='w-16 h-8 mx-3 bg-gray-100 border-black border-solid border text-center font-semibold shadow cursor-pointer hover:shadow-lg'>
                Day 3
              </h1>
            </div>

            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId='trips'>
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
                              className='inline-block'
                            >
                              <div className='flex justify-center w-1/3 border border-black m-2'>
                                <img
                                  src={trip.imageUrl}
                                  className='w-40 h-40 object-cover'
                                  alt='tripPhoto'
                                />
                                <div className='flex-column justify-center p-2'>
                                  <h5 className='font-semibold mx-2 underline'>
                                    Name
                                  </h5>
                                  <p className='mx-2'>{trip.name}</p>
                                  <h5 className='font-semibold mx-2 underline'>
                                    Location
                                  </h5>
                                  <p className='mx-2'>{trip.location}</p>
                                  <h5 className='font-semibold mx-2 underline'>
                                    Description
                                  </h5>
                                  <p className='mx-2'>{trip.description}</p>
                                </div>
                              </div>
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
        <div>
          <img
            src='https://i.pinimg.com/736x/a9/11/36/a911366d29e6ad443631718e6a38dd4d.jpg'
            alt='New York'
          />
        </div>
      </div>

      <div className='flex-column justify-center mt-4'>
        <h2 className='font-semibold underline'>Unassigned:</h2>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId='trips'>
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
                          className='inline-block'
                        >
                          <div className='flex justify-center w-1/3 border border-black m-2'>
                            <img
                              src={trip.imageUrl}
                              className='w-40 h-40 object-cover'
                              alt='tripPhoto'
                            />
                            <div className='flex-column justify-center p-2'>
                              <h5 className='font-semibold mx-2 underline'>
                                Name
                              </h5>
                              <p className='mx-2'>{trip.name}</p>
                              <h5 className='font-semibold mx-2 underline'>
                                Location
                              </h5>
                              <p className='mx-2'>{trip.location}</p>
                              <h5 className='font-semibold mx-2 underline'>
                                Description
                              </h5>
                              <p className='mx-2'>{trip.description}</p>
                            </div>
                          </div>
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
  );
};

// const mapStateToProps = (state) => ({});
// const mapDispatchToProps = (dispatch) => ({});

// export default connect(mapStateToProps, mapDispatchToProps)(Itinerary);

export default Itinerary;
