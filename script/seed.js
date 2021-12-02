'use strict';

const {
  db,
  models: { User, Event, Itinerary },
} = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  // const users = await Promise.all([
  //   await User.create({
  //     username: 'cody',
  //     password: '123',
  //     email: 'cdog@gmail.com',
  //     firstName: 'cody',
  //     lastName: 'dog',
  //   }),
  //   await User.create({
  //     username: 'murphy',
  //     password: '123',
  //     email: 'mdog@gmail.com',
  //     firstName: 'murphy',
  //     lastName: 'gomez',
  //   }),
  // ]);

  const cody = await User.create({
    username: 'cody',
    password: '123',
    email: 'cdog@gmail.com',
    firstName: 'cody',
    lastName: 'dog',
  });

  const murphy = await User.create({
    username: 'murphy',
    password: '123',
    email: 'mdog@gmail.com',
    firstName: 'murphy',
    lastName: 'gomez',
  });

  //Create itinerary
  const itineraries = await Promise.all([
    Itinerary.create({
      name: 'Codys New York Trip',
      startDate: '2021-11-30',
      endDate: '2021-12-20',
      userId: 1,
    }),
  ]);

  await itineraries[0].addUser(2);
  await itineraries[0].addUser(1);
  console.log('PROTO', Object.keys(itineraries[0].__proto__));

  //Create EVents
  const events = await Promise.all([
    Event.create({
      eventType: 'Attraction',
      name: 'Visit Statue of Liberty',
      latitude: '70',
      longitude: '-40',
      location: 'Liberty Island, New York, NY',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      imageUrl:
        'https://a.cdn-hotels.com/gdcs/production6/d1738/3c1a71e7-0a73-4810-9935-5c4daea1954e.jpg?impolicy=fcrop&w=800&h=533&q=medium',
      itineraryId: 1,
    }),
    Event.create({
      eventType: 'Attraction',
      name: 'Visit the Met Museum',
      latitude: '70',
      longitude: '-40',
      location: '5 Museum Mile, New York, NY',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      imageUrl:
        'http://www.metmuseum.org/-/media/images/visit/met-fifth-avenue/fifthave_teaser.jpg?sc_lang=en',
      itineraryId: 1,
    }),
    Event.create({
      eventType: 'Attraction',
      name: 'Visit Freedom Tower',
      latitude: '70',
      longitude: '-40',
      location: 'Liberty Island, New York, NY',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      imageUrl:
        'https://www.nydailynews.com/resizer/EsyO7of502AOt3lM9wrqf4NCYOk=/1200x0/top/arc-anglerfish-arc2-prod-tronc.s3.amazonaws.com/public/SUNBWE47ACEVH67NCDESD2RHJ4.jpg',
      itineraryId: 1,
    }),
    Event.create({
      eventType: 'Attraction',
      name: 'Have Dinner at Lucalis',
      latitude: '70',
      longitude: '-40',
      location: '5 Evans Street, New York, NY',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      imageUrl:
        'https://infatuation.imgix.net/media/images/reviews/lucali/TeddyWolff.Lucali.Interiors.16.jpg?auto=format&w=256',
      itineraryId: 1,
    }),
    Event.create({
      eventType: 'Attraction',
      name: 'Walk in Central Park',
      latitude: '70',
      longitude: '-40',
      location: 'Central Park',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      imageUrl:
        'https://assets.centralparknyc.org/media/images/_1650x767_crop_center-center_none/Bethesda-Terrace_20190515_002.jpg',
      itineraryId: 1,
    }),
    Event.create({
      eventType: 'Attraction',
      name: 'See Phantom of The Opera',
      latitude: '70',
      longitude: '-40',
      location: 'Majestic Theatre',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      imageUrl:
        'https://static.wikia.nocookie.net/sexypedia/images/f/f8/Phantom.jpg',
      itineraryId: 1,
    }),
  ]);

  await itineraries[0].addEvents(events);
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
