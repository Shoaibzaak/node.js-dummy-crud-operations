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

const tableTypeHelper = require('../helpers/tableTypes.helper')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

var notificationCtrl = require("./notifications.controller");
//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)


var createTableType = async (req, res) => {
    console.log('createTableType')
    try {
        var tableTypeData = req.body

        tableTypeData.addedby = req.token_decoded.d

        var result = await tableTypeHelper.createTableType(tableTypeData)


    
        var message = "TableType created successfully"
        return responseHelper.success(res, result, message)


    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getTableTypesWithFullDetails = async (req, res) => {
    console.log("getTableTypesWithFullDetails called")
    var tableTypeData = req.body


    try {

        var result = await tableTypeHelper.getTableTypeWithFullDetails(tableTypeData.sortproperty, tableTypeData.sortorder, tableTypeData.offset, tableTypeData.limit, tableTypeData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getTableTypesList = async (req, res) => {
    console.log("getTableTypesList called")
    var tableTypeData = req.body


    try {

        var result = await tableTypeHelper.getTableTypeList(tableTypeData.sortproperty, tableTypeData.sortorder, tableTypeData.offset, tableTypeData.limit, tableTypeData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateTableType = async (req, res) => {
    console.log("request received for updateTableType")

    var tableTypeData = req.body
    var role = req.token_decoded.r
    try {
        tableTypeData.lastModifiedBy = req.token_decoded.d

        var result = await tableTypeHelper.updateTableType(tableTypeData)

      
        var message = 'TableType Updated successfully'


        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeTableType = async (req, res) => {
    console.log("removeTableType called")
    try {
        var role = req.token_decoded.r


        var tableTypeData = req.body
        tableTypeData.lastModifiedBy = req.token_decoded.d
        var result = await tableTypeHelper.removeTableType(tableTypeData)

        var message = "TableType removed successfully"

        if (result == "TableType does not exists.") {
            message = "TableType does not exists."
        }

       
        return responseHelper.success(res, result, message)

    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findTableTypeById = async (req, res) => {
    console.log("findTableTypeById called")
    try {
        var role = req.token_decoded.r


        var tableTypeData = req.body

        var result = await tableTypeHelper.findTableTypeById(tableTypeData)

        var message = "TableType find successfully"
        if (result == null) {
            message = "TableType does not exists."
        }


        return responseHelper.success(res, result, message)

    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createTableType,
    getTableTypesWithFullDetails,
    getTableTypesList,
    updateTableType,
    removeTableType,
    findTableTypeById

}



