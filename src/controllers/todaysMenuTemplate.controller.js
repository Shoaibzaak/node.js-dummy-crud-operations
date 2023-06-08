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

const todaysMenuTemplateHelper = require('../helpers/todaysMenuTemplate.helper')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

var notificationCtrl = require("./notifications.controller");
//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)


var createTodaysMenuTemplate = async (req, res) => {
    console.log('createTodaysMenuTemplate')
    try {
        var todaysMenuTemplateData = req.body

        todaysMenuTemplateData.addedby = req.token_decoded.d

        var result = await todaysMenuTemplateHelper.createTodaysMenuTemplate(todaysMenuTemplateData)


    
        var message = "TodaysMenuTemplate created successfully"
        return responseHelper.success(res, result, message)


    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getTodaysMenuTemplatesWithFullDetails = async (req, res) => {
    console.log("getTodaysMenuTemplatesWithFullDetails called")
    var todaysMenuTemplateData = req.body


    try {

        var result = await todaysMenuTemplateHelper.getTodaysMenuTemplateWithFullDetails(todaysMenuTemplateData.sortproperty, todaysMenuTemplateData.sortorder, todaysMenuTemplateData.offset, todaysMenuTemplateData.limit, todaysMenuTemplateData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getTodaysMenuTemplatesList = async (req, res) => {
    console.log("getTodaysMenuTemplatesList called")
    var todaysMenuTemplateData = req.body


    try {

        var result = await todaysMenuTemplateHelper.getTodaysMenuTemplateList(todaysMenuTemplateData.sortproperty, todaysMenuTemplateData.sortorder, todaysMenuTemplateData.offset, todaysMenuTemplateData.limit, todaysMenuTemplateData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateTodaysMenuTemplate = async (req, res) => {
    console.log("request received for updateTodaysMenuTemplate")

    var todaysMenuTemplateData = req.body
    var role = req.token_decoded.r
    try {
        todaysMenuTemplateData.lastModifiedBy = req.token_decoded.d

        var result = await todaysMenuTemplateHelper.updateTodaysMenuTemplate(todaysMenuTemplateData)

      
        var message = 'TodaysMenuTemplate Updated successfully'


        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeTodaysMenuTemplate = async (req, res) => {
    console.log("removeTodaysMenuTemplate called")
    try {
        var role = req.token_decoded.r


        var todaysMenuTemplateData = req.body
        todaysMenuTemplateData.lastModifiedBy = req.token_decoded.d
        var result = await todaysMenuTemplateHelper.removeTodaysMenuTemplate(todaysMenuTemplateData)

        var message = "TodaysMenuTemplate removed successfully"

        if (result == "TodaysMenuTemplate does not exists.") {
            message = "TodaysMenuTemplate does not exists."
        }

       
        return responseHelper.success(res, result, message)

    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findTodaysMenuTemplateById = async (req, res) => {
    console.log("findTodaysMenuTemplateById called")
    try {
        var role = req.token_decoded.r


        var todaysMenuTemplateData = req.body

        var result = await todaysMenuTemplateHelper.findTodaysMenuTemplateById(todaysMenuTemplateData)

        var message = "TodaysMenuTemplate find successfully"
        if (result == null) {
            message = "TodaysMenuTemplate does not exists."
        }


        return responseHelper.success(res, result, message)

    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createTodaysMenuTemplate,
    getTodaysMenuTemplatesWithFullDetails,
    getTodaysMenuTemplatesList,
    updateTodaysMenuTemplate,
    removeTodaysMenuTemplate,
    findTodaysMenuTemplateById

}



