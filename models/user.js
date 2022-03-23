'use strict';

const mongoose = require( 'mongoose' );

var userSchema = mongoose.Schema( {
  name: String,
  gender: String
} );

module.exports = mongoose.model( 'User', userSchema );
