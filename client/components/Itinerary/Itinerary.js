import React from 'react';
import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Day from '../Day/Day';
import EventCard from '../EventCard/EventCard';

// const trips = [
//   {
//     id: 221,
//     name: "Visit Statue of Liberty",
//     location: "Liberty Island, New York, NY",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
//     imageUrl: liberty,
//   },
//   {
//     id: 222,
//     name: "Visit the Met Museum",
//     location: "5 Museum Mile, New York, NY",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
//     imageUrl:
//       "http://www.metmuseum.org/-/media/images/visit/met-fifth-avenue/fifthave_teaser.jpg?sc_lang=en”,
//   },
//   {
//     id: 223,
//     name: "Visit Freedom Tower”,
//     location: "Liberty Island, New York, NY”,
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
//     imageUrl:
//       "https://www.nydailynews.com/resizer/EsyO7of502AOt3lM9wrqf4NCYOk=/1200x0/top/arc-anglerfish-arc2-prod-tronc.s3.amazonaws.com/public/SUNBWE47ACEVH67NCDESD2RHJ4.jpg”,
//   },
//   {
//     id: 224,
//     name: "Have Dinner at Lucalis”,
//     location: "5 Evans Street, New York, NY”,
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
//     imageUrl:
//       "https://infatuation.imgix.net/media/images/reviews/lucali/TeddyWolff.Lucali.Interiors.16.jpg?auto=format&w=256”,
//   },
// ];

class Itinerary extends React.Component {
  render() {
    return (
      <div className='m-4'>
        <div className='flex justify-around'>
          <div className='flex-column'>
            <div className='flex'>
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

            <Day />
          </div>
          <div>
            <img
              src='https://i.pinimg.com/736x/a9/11/36/a911366d29e6ad443631718e6a38dd4d.jpg'
              alt='New York'
            />
          </div>
        </div>

        <div className='flex justify-center mt-4'>
          <h2 className='font-semibold underline'>Unassigned:</h2>
          <EventCard />
        </div>
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({});
// const mapDispatchToProps = (dispatch) => ({});

// export default connect(mapStateToProps, mapDispatchToProps)(Itinerary);

export default Itinerary;
