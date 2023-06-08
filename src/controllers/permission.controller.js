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


const permissionHelper = require('../helpers/permissions.helper')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createPermission = async (req, res) => {
    console.log('createPermission')
    try {
        var permissionData = req.body
        
        permissionData.addedby = req.token_decoded.d

        console.log(req.token_decoded.r)

        
            var result = await permissionHelper.createPermission(permissionData)
            var message = "Permission created successfully"
            return responseHelper.success(res, result, message)
        

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getPermissionsWithFullDetails = async (req, res) => {
    console.log("getPermissionsWithFullDetails called")
    var permissionData = req.body


    try {

        var result = await permissionHelper.getPermissionsWithFullDetails(permissionData.sortproperty, permissionData.sortorder, permissionData.offset, permissionData.limit, permissionData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getPermissionsList = async (req, res) => {
    console.log("getPermissionsList called")
    var permissionData = req.body


    try {

        var result = await permissionHelper.getPermissionsList(permissionData.sortproperty, permissionData.sortorder, permissionData.offset, permissionData.limit, permissionData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updatePermission = async (req, res) => {
    console.log("request received for updatePermission")

    var permissionData = req.body
    var role = req.token_decoded.r
    try {
        permissionData.lastModifiedBy = req.token_decoded.d
        
            var result = await permissionHelper.updatePermission(permissionData)
            var message = 'Permission Updated successfully'
        

        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removePermission = async (req, res) => {
    console.log("removePermission called")
    try {
        var role = req.token_decoded.r

       
            var permissionData = req.body
            permissionData.lastModifiedBy = req.token_decoded.d
            var result = await permissionHelper.removePermission(permissionData)

            var message = "Permission removed successfully"

            if (result == "Permission does not exists.") {
                message = "Permission does not exists."
            }
            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findPermissionById = async (req, res) => {
    console.log("findPermissionById called")
    try {
        var role = req.token_decoded.r

        
            var permissionData = req.body

            var result = await permissionHelper.findPermissionById(permissionData)
            console.log(result)
            var message = "Permission find successfully"
            if (result == null) {
                message = "Permission does not exists."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createPermission,
    getPermissionsWithFullDetails,
    getPermissionsList,
    updatePermission,
    removePermission,
    findPermissionById

}



