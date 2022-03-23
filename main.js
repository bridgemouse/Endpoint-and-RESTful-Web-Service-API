'use strict';

const express = require( 'express' ),
  layouts = require( 'express-ejs-layouts' ),
  app = express(),
  router = require( './routes/index' ),
  bodyParser = require( 'body-parser' ),
  mongoose = require( 'mongoose' ),
  methodOverride = require( 'method-override' ),
  apiRoute = require('./Routes/apiRoutes');

mongoose.connect(
  "mongodb://localhost:27017/usersdb",
    {useNewUrlParser: true, useUnifiedTopology: true}
  );

app.set( 'port', process.env.PORT || 3000 );
app.set( 'view engine', 'ejs' );

app.use( methodOverride( '_method', {
  methods: [ 'POST', 'GET' ]
} ) );

app.use( layouts );
app.use( express.static( 'public' ) );

app.use( bodyParser.urlencoded( {
  extended: false
} ) );
app.use( bodyParser.json() );

app.use('/api', apiRoute)
app.use( '/', router );

app.listen( app.get( 'port' ), () => {
  console.log( `Server running at http://localhost:${app.get('port')}` );
} );
const db = mongoose.connection;
db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
  });