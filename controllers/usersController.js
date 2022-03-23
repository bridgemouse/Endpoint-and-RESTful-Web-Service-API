'use strict';

const User = require( '../models/user' );

module.exports = {
  redirectView: ( req, res, next ) => {
    let redirectPath = res.locals.redirect;
    if ( redirectPath !== undefined ) res.redirect( redirectPath );
    else next();
  },
  
  index: ( req, res, next ) => {
    User.find()
      .then( users => {
        res.locals.users = users;
        next();
      } )
      .catch( error => {
        console.log( `Error fetching users: ${error.message}` );
        next( error );
      } );
  },
  indexView: ( req, res ) => {
    if (req.query.format === 'json'){
      res.json(res.locals.users);
    } else {
    res.render( 'users' );
    }
  },

  saveUser: ( req, res ) => {
    let newUser = new User( {
      name: req.body.name,
      gender: req.body.gender,
    } );
    newUser.save()
      .then( () => {
        console.log( 'New User Added!');
        res.render( 'thanks' );
      } )
      .catch( error => {
        res.send( error );
      } );
  },

  show: ( req, res, next ) => {
    let userId = req.params.id;
    User.findById( userId )
      .then( user => {
        res.locals.user = user;
        next();
      } )
      .catch( error => {
        console.log( `Error fetching user by ID: ${error.message}` );
        next( error );
      } );
  },

  showView: ( req, res ) => {
    res.render( 'users/show' );
  },

  edit: ( req, res, next ) => {
    let userId = req.params.id;
    User.findById( userId )
      .then( user => {
        res.render( 'users/edit', {
          user: user
        } );
      } )
      .catch( error => {
        console.log( `Error fetching user by ID: ${error.message}` );
        next( error );
      } );
  },

  update: ( req, res, next ) => {
    let userId = req.params.id,
      userParams = {
        name: req.body.name,
        gender: req.body.gender
        };

    User.findByIdAndUpdate( userId, {
        $set: userParams
      } )
      .then( user => {
        res.locals.redirect = `/users/${userId}`;
        res.locals.user = user;
        next();
      } )
      .catch( error => {
        console.log( `Error updating user by ID: ${error.message}` );
        next( error );
      } );
  },

  delete: ( req, res, next ) => {
    let userId = req.params.id;
    User.findByIdAndRemove( userId )
      .then( () => {
        res.locals.redirect = '/users';
        next();
      } )
      .catch( error => {
        console.log( `Error deleting user by ID: ${error.message}` );
        next();
      } );
  },

  respondJSON: ( req, res ) => {
    res.json( {
      status: 200,
      data: res.locals
    } );
  },

  errorJSON: ( error, req, res, next ) => {
    let errorObject;

    if ( error ) {
      errorObject = {
        status: 500,
        message: error.message
      };
    } else {
      errorObject = {
        status: 200,
        message: 'Unknown Error.'
      };
    }
    res.json( errorObject );

  },

};
