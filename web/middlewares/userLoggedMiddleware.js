const User = require('../models/User')

function userLogged(req, res, next) {
  // Checking email saved in cookie
  let emailCookie = req.cookies.userEmail;
  // Getting user data using email in DB
  let userFromCookie = User.findByField('email', emailCookie);

  // If user exists create session with credentials in browser
  if(userFromCookie){
    req.session.userLogged = userFromCookie
  }

  res.locals.user = req.session.userLogged || undefined;

  next();
}

module.exports = userLogged;