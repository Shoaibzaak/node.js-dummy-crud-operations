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

const dishCategoryHelper = require('../helpers/dishCategories.helper')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

var notificationCtrl = require("./notifications.controller");
//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)


var createDishCategory = async (req, res) => {
    console.log('createDishCategory')
    try {
        var dishCategoryData = req.body

        dishCategoryData.addedby = req.token_decoded.d

        var result = await dishCategoryHelper.createDishCategory(dishCategoryData)

        var message = "DishCategory created successfully"
        return responseHelper.success(res, result, message)


    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getDishCategorysWithFullDetails = async (req, res) => {
    console.log("getDishCategorysWithFullDetails called")
    var dishCategoryData = req.body


    try {

        var result = await dishCategoryHelper.getDishCategoryWithFullDetails(dishCategoryData.sortproperty, dishCategoryData.sortorder, dishCategoryData.offset, dishCategoryData.limit, dishCategoryData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getDishCategorysList = async (req, res) => {
    console.log("getDishCategorysList called")
    var dishCategoryData = req.body


    try {

        var result = await dishCategoryHelper.getDishCategoryList(dishCategoryData.sortproperty, dishCategoryData.sortorder, dishCategoryData.offset, dishCategoryData.limit, dishCategoryData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateDishCategory = async (req, res) => {
    console.log("request received for updateDishCategory")

    var dishCategoryData = req.body
    var role = req.token_decoded.r
    try {
        dishCategoryData.lastModifiedBy = req.token_decoded.d

        var result = await dishCategoryHelper.updateDishCategory(dishCategoryData)
       
        var message = 'DishCategory Updated successfully'


        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeDishCategory = async (req, res) => {
    console.log("removeDishCategory called")
    try {
        var role = req.token_decoded.r


        var dishCategoryData = req.body
        dishCategoryData.lastModifiedBy = req.token_decoded.d
        var result = await dishCategoryHelper.removeDishCategory(dishCategoryData)

        var message = "DishCategory removed successfully"

        if (result == "DishCategory does not exists.") {
            message = "DishCategory does not exists."
        }
       
        return responseHelper.success(res, result, message)

    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findDishCategoryById = async (req, res) => {
    console.log("findDishCategoryById called")
    try {
        var role = req.token_decoded.r


        var dishCategoryData = req.body

        var result = await dishCategoryHelper.findDishCategoryById(dishCategoryData)

        var message = "DishCategory find successfully"
        if (result == null) {
            message = "DishCategory does not exists."
        }


        return responseHelper.success(res, result, message)

    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createDishCategory,
    getDishCategorysWithFullDetails,
    getDishCategorysList,
    updateDishCategory,
    removeDishCategory,
    findDishCategoryById

}



