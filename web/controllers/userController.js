const { validationResult, body } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const httpRequest = require("request");

const controller = {
  login: (req, res) => {
    res.render("login", {
      title: "LOGIN LEO DESIGN&FURNITURE",
      cssFile: "register",
    });
  },
  sendLogin: (req, res) => {
    // Checking if user email is DB
    let userToLogin = User.findByField("email", req.body.email);
    // Getting validation errors
    let errors = validationResult(req);
    // Leaving only email and password errors
    errors.errors = errors.errors.filter((e) => e.value !== undefined);
    // If no errors
    if (errors.isEmpty()) {
      // If user exists
      if (userToLogin) {
        //  Checking password
        let passwordIsOk = bcrypt.compareSync(
          req.body.password,
          userToLogin.password
        );
        if (passwordIsOk) {
          //  WELCOME
          // Saving user in session
          delete userToLogin.password;
          req.session.userLogged = userToLogin;
          //  Checking if keep session
          if (req.body.chsession) {
            res.cookie("userEmail", req.body.email, { maxAge: 1000 * 60 * 3 });
          }
          return res.redirect("/");
        } else {
          // If input password dont match with user password
          // Creating error for wrong password
          errors.errors.push({
            value: req.body.email,
            msg: "La contraseña es incorrecta",
            param: "email", // leaving email param to error appear at top
            location: "body",
          });
          return res.render("login", {
            title: "LOGIN LEO DESIGN&FURNITURE",
            cssFile: "register",
            errors: errors.mapped(),
            old: req.body,
          });
        }
      } else {
        // If email dont exist in DB
        // Creating error for unexisting email
        errors.errors.push({
          value: req.body.email,
          msg: "Este email no esta registrado",
          param: "email",
          location: "body",
        });
        return res.render("login", {
          title: "LOGIN LEO DESIGN&FURNITURE",
          cssFile: "register",
          errors: errors.mapped(),
          old: req.body,
        });
      }
    } else {
      // Errors in register form
      return res.render("login", {
        title: "LOGIN LEO DESIGN&FURNITURE",
        cssFile: "register",
        errors: errors.mapped(),
        old: req.body,
      });
    }
  },
  register: (req, res) => {
    res.render("register", {
      title: "REGISTER LEO DESIGN&FURNITURE",
      cssFile: "register",
    });
  },
  sendRegister: (req, res) => {
    let errors = validationResult(req);
    // If there are no erros from validator
    if (errors.isEmpty()) {
      // Check if email is already registered by other user
      let userInDB = User.findByField("email", req.body.email);
      if (userInDB) {
        // Return ERROR user already exists
        return res.render("register", {
          title: "REGISTER LEO DESIGN&FURNITURE",
          cssFile: "register",
          errors: {
            email: {
              msg: "Este correo ya esta registrado",
            },
          },
          old: req.body,
        });
      }
      // If email not registered, add new user
      let newUser = {
        ...req.body,
        password: bcrypt.hashSync(req.body.password, 10),
      };
      //   Create user
      User.create(newUser);
      // Redirect to access
      return res.redirect("/user/login");
    } else {
      // Errors in register form
      return res.render("register", {
        title: "REGISTER LEO DESIGN&FURNITURE",
        cssFile: "register",
        errors: errors.mapped(),
        old: req.body,
      });
    }
  },
  logout: (req, res) => {
    // Clean cookies
    res.clearCookie("userEmail");
    req.session.destroy();
    return res.redirect("/");
  },
  message: (req, res) => {
    //  Making POST method to Flask Server
    httpRequest({
      method:'POST',
      form: {message:req.body.message},
      url: 'http://localhost:3002/bot/response'
    }, function (err, postRes, body) {
      if (err) {
        res.end( JSON.stringify( err ) );
      }
      else {
        console.log("******************ANSWER******************")
        console.log(body)
        res.end(  body  );
      }
    });
    

  },
};

module.exports = controller;
