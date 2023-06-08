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

const tableOrderHelper = require('../helpers/tableOrders.helper')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

var notificationCtrl = require("./notifications.controller");
//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)


var createTableOrder = async (req, res) => {
    console.log('createTableOrder')
    try {
        var tableOrderData = req.body

        tableOrderData.addedby = req.token_decoded.d

        var result = await tableOrderHelper.createTableOrder(tableOrderData)


    
        var message = "TableOrder created successfully"
        return responseHelper.success(res, result, message)


    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getTableOrdersWithFullDetails = async (req, res) => {
    console.log("getTableOrdersWithFullDetails called")
    var tableOrderData = req.body


    try {

        var result = await tableOrderHelper.getTableOrderWithFullDetails(tableOrderData.sortproperty, tableOrderData.sortorder, tableOrderData.offset, tableOrderData.limit, tableOrderData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getTableOrdersList = async (req, res) => {
    console.log("getTableOrdersList called")
    var tableOrderData = req.body


    try {

        var result = await tableOrderHelper.getTableOrderList(tableOrderData.sortproperty, tableOrderData.sortorder, tableOrderData.offset, tableOrderData.limit, tableOrderData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateTableOrder = async (req, res) => {
    console.log("request received for updateTableOrder")

    var tableOrderData = req.body
    var role = req.token_decoded.r
    try {
        tableOrderData.lastModifiedBy = req.token_decoded.d

        var result = await tableOrderHelper.updateTableOrder(tableOrderData)

      
        var message = 'TableOrder Updated successfully'


        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeTableOrder = async (req, res) => {
    console.log("removeTableOrder called")
    try {
        var role = req.token_decoded.r


        var tableOrderData = req.body
        tableOrderData.lastModifiedBy = req.token_decoded.d
        var result = await tableOrderHelper.removeTableOrder(tableOrderData)

        var message = "TableOrder removed successfully"

        if (result == "TableOrder does not exists.") {
            message = "TableOrder does not exists."
        }

       
        return responseHelper.success(res, result, message)

    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findTableOrderById = async (req, res) => {
    console.log("findTableOrderById called")
    try {
        var role = req.token_decoded.r


        var tableOrderData = req.body

        var result = await tableOrderHelper.findTableOrderById(tableOrderData)

        var message = "TableOrder find successfully"
        if (result == null) {
            message = "TableOrder does not exists."
        }


        return responseHelper.success(res, result, message)

    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createTableOrder,
    getTableOrdersWithFullDetails,
    getTableOrdersList,
    updateTableOrder,
    removeTableOrder,
    findTableOrderById

}



