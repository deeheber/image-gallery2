# Image Gallery

### This is an image gallery app that uses MongoDB, Express, AngularJS, node.js, and Webpack.

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
- All form fields are required to add and item
- Can delete images from the individual album list view only

### Tests
`cd app` and `npm run test`
