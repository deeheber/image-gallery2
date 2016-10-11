# Image Gallery App

[Live site here](https://dh-photo-album-app.herokuapp.com/#/)

### This is an image gallery app that uses MongoDB, Express, AngularJS, node.js, Webpack, and deployed via Heroku.

### Users can CRUD photo albums and images within the photo albums after logging in

### Directions to run locally
1. Download the files
2. Set up database
  - [Download MongoDB](https://www.mongodb.com/download-center#community)
  - Start the database `mongod --dbpath [path to your MongoDB folder here]`
3. Set up the server
  - `cd server` and `npm install`
  - Start the server `npm start` (in a new terminal window)
4. Set up the frontend
  - New terminal window and `cd app`
  - `npm install` and `npm run build`
  - Navigate to `localhost:8080` in a web browser

### Misc Info
- Server runs on `localhost:3000` by default
- Frontend runs on `localhost:8080` by default
- Must login or create an account to view albums
- All form fields are required to add and item
- When updating, the form fields must be filled out and not the same as the original data
- Can delete/update/add images from the individual album list view only

### Tests
- application
`cd app` and `npm run test`
- server
`cd server` and `npm run test` (the connected database must be running)
