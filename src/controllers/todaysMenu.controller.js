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

const todaysMenuHelper = require('../helpers/todaysMenu.helper')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

var notificationCtrl = require("./notifications.controller");
//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)


var createTodaysMenu = async (req, res) => {
    console.log('createTodaysMenu')
    try {
        var todaysMenuData = req.body

        todaysMenuData.addedby = req.token_decoded.d

        var result = await todaysMenuHelper.createTodaysMenu(todaysMenuData)


    
        var message = "TodaysMenu created successfully"
        return responseHelper.success(res, result, message)


    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getTodaysMenusWithFullDetails = async (req, res) => {
    console.log("getTodaysMenusWithFullDetails called")
    var todaysMenuData = req.body


    try {

        var result = await todaysMenuHelper.getTodaysMenuWithFullDetails(todaysMenuData.sortproperty, todaysMenuData.sortorder, todaysMenuData.offset, todaysMenuData.limit, todaysMenuData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getTodaysMenusList = async (req, res) => {
    console.log("getTodaysMenusList called")
    var todaysMenuData = req.body


    try {

        var result = await todaysMenuHelper.getTodaysMenuList(todaysMenuData.sortproperty, todaysMenuData.sortorder, todaysMenuData.offset, todaysMenuData.limit, todaysMenuData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateTodaysMenu = async (req, res) => {
    console.log("request received for updateTodaysMenu")

    var todaysMenuData = req.body
    var role = req.token_decoded.r
    try {
        todaysMenuData.lastModifiedBy = req.token_decoded.d

        var result = await todaysMenuHelper.updateTodaysMenu(todaysMenuData)

      
        var message = 'TodaysMenu Updated successfully'


        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeTodaysMenu = async (req, res) => {
    console.log("removeTodaysMenu called")
    try {
        var role = req.token_decoded.r


        var todaysMenuData = req.body
        todaysMenuData.lastModifiedBy = req.token_decoded.d
        var result = await todaysMenuHelper.removeTodaysMenu(todaysMenuData)

        var message = "TodaysMenu removed successfully"

        if (result == "TodaysMenu does not exists.") {
            message = "TodaysMenu does not exists."
        }

       
        return responseHelper.success(res, result, message)

    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findTodaysMenuById = async (req, res) => {
    console.log("findTodaysMenuById called")
    try {
        var role = req.token_decoded.r


        var todaysMenuData = req.body

        var result = await todaysMenuHelper.findTodaysMenuById(todaysMenuData)

        var message = "TodaysMenu find successfully"
        if (result == null) {
            message = "TodaysMenu does not exists."
        }


        return responseHelper.success(res, result, message)

    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createTodaysMenu,
    getTodaysMenusWithFullDetails,
    getTodaysMenusList,
    updateTodaysMenu,
    removeTodaysMenu,
    findTodaysMenuById

}



