/**
 * Created by Jamshaid
 */


//import mongoose and models
var mongoose = require('mongoose')

var config = require('dotenv').config()
//var notificationCtrl = require("./notifications.controller")

//Lodash for data manipulation
const _ = require('lodash')

//bluebird for promises
const promise = require('bluebird')

//async for async tasks
var async = require('async')

const dishHelper =  require('../helpers/dishes.helper')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

var notificationCtrl = require("./notifications.controller");
//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)


var createDish = async (req, res) => {
    console.log('createDish')
    try {
        var dishData = req.body

        dishData.addedby = req.token_decoded.d

        var result = await dishHelper.createDish(dishData)


    
        var message = "Dish created successfully"
        return responseHelper.success(res, result, message)


    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getDishsWithFullDetails = async (req, res) => {
    console.log("getDishsWithFullDetails called")
    var dishData = req.body


    try {

        var result = await dishHelper.getDishWithFullDetails(dishData.sortproperty, dishData.sortorder, dishData.offset, dishData.limit, dishData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getDishsList = async (req, res) => {
    console.log("getDishsList called")
    var dishData = req.body


    try {

        var result = await dishHelper.getDishList(dishData.sortproperty, dishData.sortorder, dishData.offset, dishData.limit, dishData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateDish = async (req, res) => {
    console.log("request received for updateDish")

    var dishData = req.body
    var role = req.token_decoded.r
    try {
        dishData.lastModifiedBy = req.token_decoded.d

        var result = await dishHelper.updateDish(dishData)

      
        var message = 'Dish Updated successfully'


        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeDish = async (req, res) => {
    console.log("removeDish called")
    try {
        var role = req.token_decoded.r


        var dishData = req.body
        dishData.lastModifiedBy = req.token_decoded.d
        var result = await dishHelper.removeDish(dishData)

        var message = "Dish removed successfully"

        if (result == "Dish does not exists.") {
            message = "Dish does not exists."
        }

       
        return responseHelper.success(res, result, message)

    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findDishById = async (req, res) => {
    console.log("findDishById called")
    try {
        var role = req.token_decoded.r


        var dishData = req.body

        var result = await dishHelper.findDishById(dishData)

        var message = "Dish find successfully"
        if (result == null) {
            message = "Dish does not exists."
        }


        return responseHelper.success(res, result, message)

    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createDish,
    getDishsWithFullDetails,
    getDishsList,
    updateDish,
    removeDish,
    findDishById

}



