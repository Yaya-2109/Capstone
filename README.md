# Booya Travel
The React/Redux app is designed and developed to help travelers organize their itineraries. A FullStack Academy capstone project with four contributors. Features include drag and dropping activities/itineraries while planning an itinerary, realtime chat with collaborators, autocomplete for simple and quick searching, and markers rendering on the map depending on the list of locations.

# Tech Stack
This web app employs the following technologies(not inclusive):

* Express - 4.16.4
* Axios - 0.21.1
* React(Components and Routes)
* Redux(state management)
* React Beautiful DnD
* PostgresQL - Database
* Bcrypt and JWT for authentication and authorization
* Socket.IO - Realtime Chat
* Google Maps API, Places Library
* Travel Advisor API

# Set-Up
1. clone this repo to your local environment -- git clone < git repository >
2. cd(change directory) into the repo
3. $run 'npm install' into your command line
4. $run 'npm run seed' into your command line
5. $run 'npm start:dev' into your command line
6. Sync and seed your database by running `npm run seed`. Running `npm run start:dev` will make great things happen!
# Other options
- start:dev will both start your server and build your client side files using webpack
- start:dev:logger is the same as start:dev, but you will see your SQL queries (can be helpful for debugging)
- start:dev:seed will start your server and also seed your database (this is useful when you are making schema changes and you don't want to run your seed script separately)

# What's Next?

Database schema will need to be updated with more tables to add more features. Frontend styling and accessibility will also be greatly improved, and will be revisited in the near future. We will be taking in recommendations and tracking the features in the Nice-To-Have section below.

# Nice to have features(not final):

* Adding prompts and validations
* Allowing a user to delete their account
* Allowing a user to to edit their account info, emails, passwords, avatars, and etc... 

# Known Issues so far:
* 

# Sample Images/Gifs: 

### Filtering by Type and Rating
![filtering](https://github.com/Yaya-2109/Capstone/blob/main/public/typerating.gif)

### Map Drag and fetching new places
![mapdrag](https://github.com/Yaya-2109/Capstone/blob/main/public/mapdrag.gif)

### Autocomplete
![autocomplete](https://github.com/Yaya-2109/Capstone/blob/main/public/autocomplete.gif)
