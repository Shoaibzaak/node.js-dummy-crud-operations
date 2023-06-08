/**
 * All the authorized are autherised here and unauthorised routes are declared as pulic
 */
 
const express = require("express");
const router = express.Router();

//middleware to authenticate JWT based authentication of users and routes

var auth = require("../middlewares").auth;

//All the Authorized routes
var authorizedRoutes = require("./authorized");

//All the Unautheorised Routes
var unAuthorizedRoutes = require("./unauthorized");

router.use((req, res, next) => {
  console.log("++++++++++++++++++++")
  if (req.method === "OPTIONS") {
    res.status(200).send();
  } else {
    next();
  }
});

router.use(unAuthorizedRoutes,  authorizedRoutes);
// auth.authenticate
module.exports = router;
