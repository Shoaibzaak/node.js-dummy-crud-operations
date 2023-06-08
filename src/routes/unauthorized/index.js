
 
const express = require('express');
const router = express.Router();

//get defined routes
const userRoutes = require('./user.route');



//call appropriate routes

//Un-restricted routes
router.use ('/users', userRoutes);



module.exports = router;
