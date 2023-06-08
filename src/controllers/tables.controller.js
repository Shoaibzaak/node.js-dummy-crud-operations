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

const tableHelper = require('../helpers/tables.helper')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

var notificationCtrl = require("./notifications.controller");
//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)


var createTable = async (req, res) => {
    console.log('createTable')
    try {
        var tableData = req.body

        tableData.addedby = req.token_decoded.d

        var result = await tableHelper.createTable(tableData)


    
        var message = "Table created successfully"
        return responseHelper.success(res, result, message)


    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getTablesWithFullDetails = async (req, res) => {
    console.log("getTablesWithFullDetails called")
    var tableData = req.body


    try {

        var result = await tableHelper.getTableWithFullDetails(tableData.sortproperty, tableData.sortorder, tableData.offset, tableData.limit, tableData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getTablesList = async (req, res) => {
    console.log("getTablesList called")
    var tableData = req.body


    try {

        var result = await tableHelper.getTableList(tableData.sortproperty, tableData.sortorder, tableData.offset, tableData.limit, tableData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateTable = async (req, res) => {
    console.log("request received for updateTable")

    var tableData = req.body
    var role = req.token_decoded.r
    try {
        tableData.lastModifiedBy = req.token_decoded.d

        var result = await tableHelper.updateTable(tableData)

      
        var message = 'Table Updated successfully'


        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeTable = async (req, res) => {
    console.log("removeTable called")
    try {
        var role = req.token_decoded.r


        var tableData = req.body
        tableData.lastModifiedBy = req.token_decoded.d
        var result = await tableHelper.removeTable(tableData)

        var message = "Table removed successfully"

        if (result == "Table does not exists.") {
            message = "Table does not exists."
        }

       
        return responseHelper.success(res, result, message)

    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findTableById = async (req, res) => {
    console.log("findTableById called")
    try {
        var role = req.token_decoded.r


        var tableData = req.body

        var result = await tableHelper.findTableById(tableData)

        var message = "Table find successfully"
        if (result == null) {
            message = "Table does not exists."
        }


        return responseHelper.success(res, result, message)

    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createTable,
    getTablesWithFullDetails,
    getTablesList,
    updateTable,
    removeTable,
    findTableById

}



