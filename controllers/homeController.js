'use strict';

module.exports = {
  index: ( req, res ) => {
    res.render( 'index' );
    console.log( 'Home Page Loaded!');
  },
  showSignUp: ( req, res ) => {
    res.render( 'contact' );
  }
};