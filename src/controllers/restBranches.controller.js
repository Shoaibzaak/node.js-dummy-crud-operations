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


const restBranchHelper = require('../helpers/restBranches.helper')
//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

var notificationCtrl = require("./notifications.controller");
//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)


var createRestBranch = async (req, res) => {
    console.log('createRestBranch')
    try {
        var restBranchData = req.body;
        
        restBranchData.addedby = req.token_decoded.d

        var result = await restBranchHelper.createRestBranch(restBranchData)
        
        var message = "RestBranch created successfully"
        return responseHelper.success(res, result, message)


    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getRestBranchsWithFullDetails = async (req, res) => {
    console.log("getRestBranchsWithFullDetails called")
    var restBranchData = req.body


    try {

        var result = await restBranchHelper.getRestBranchWithFullDetails(restBranchData.sortproperty, restBranchData.sortorder, restBranchData.offset, restBranchData.limit, restBranchData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getRestBranchsList = async (req, res) => {
    console.log("getRestBranchsList called")
    var restBranchData = req.body


    try {

        var result = await restBranchHelper.getRestBranchList(restBranchData.sortproperty, restBranchData.sortorder, restBranchData.offset, restBranchData.limit, restBranchData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateRestBranch = async (req, res) => {
    console.log("request received for updateRestBranch")

    var restBranchData = req.body
    var role = req.token_decoded.r
    try {
        restBranchData.lastModifiedBy = req.token_decoded.d

        var result = await restBranchHelper.updateRestBranch(restBranchData)

        var message = 'RestBranch Updated successfully'


        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeRestBranch = async (req, res) => {
    console.log("removeRestBranch called")
    try {
        var role = req.token_decoded.r


        var restBranchData = req.body
        restBranchData.lastModifiedBy = req.token_decoded.d
        var result = await restBranchHelper.removeRestBranch(restBranchData)

        var message = "RestBranch removed successfully"

        if (result == "RestBranch does not exists.") {
            message = "RestBranch does not exists."
        }
     
        return responseHelper.success(res, result, message)

    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findRestBranchById = async (req, res) => {
    console.log("findRestBranchById called")
    try {
        var role = req.token_decoded.r


        var restBranchData = req.body

        var result = await restBranchHelper.findRestBranchById(restBranchData)

        var message = "RestBranch find successfully"
        if (result == null) {
            message = "RestBranch does not exists."
        }


        return responseHelper.success(res, result, message)

    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createRestBranch,
    getRestBranchsWithFullDetails,
    getRestBranchsList,
    updateRestBranch,
    removeRestBranch,
    findRestBranchById

}



