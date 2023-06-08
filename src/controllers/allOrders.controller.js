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

const allOrdersHelper = require('../helpers/allOrders.helper')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

var notificationCtrl = require("./notifications.controller");
//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)


var createAllOrder = async (req, res) => {
    console.log('createAllOrder')
    try {
        var allOrderData = req.body

        allOrderData.addedby = req.token_decoded.d

        var result = await allOrdersHelper.createAllOrder(allOrderData)


    
        var message = "AllOrder created successfully"
        return responseHelper.success(res, result, message)


    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getAllOrdersWithFullDetails = async (req, res) => {
    console.log("getAllOrdersWithFullDetails called")
    var allOrderData = req.body


    try {

        var result = await allOrdersHelper.getAllOrderWithFullDetails(allOrderData.sortproperty, allOrderData.sortorder, allOrderData.offset, allOrderData.limit, allOrderData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getAllOrdersList = async (req, res) => {
    console.log("getAllOrdersList called")
    var allOrderData = req.body


    try {

        var result = await allOrdersHelper.getAllOrderList(allOrderData.sortproperty, allOrderData.sortorder, allOrderData.offset, allOrderData.limit, allOrderData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateAllOrder = async (req, res) => {
    console.log("request received for updateAllOrder")

    var allOrderData = req.body
    var role = req.token_decoded.r
    try {
        allOrderData.lastModifiedBy = req.token_decoded.d

        var result = await allOrdersHelper.updateAllOrder(allOrderData)

      
        var message = 'AllOrder Updated successfully'


        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeAllOrder = async (req, res) => {
    console.log("removeAllOrder called")
    try {
        var role = req.token_decoded.r


        var allOrderData = req.body
        allOrderData.lastModifiedBy = req.token_decoded.d
        var result = await allOrdersHelper.removeAllOrder(allOrderData)

        var message = "AllOrder removed successfully"

        if (result == "AllOrder does not exists.") {
            message = "AllOrder does not exists."
        }

       
        return responseHelper.success(res, result, message)

    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findAllOrderById = async (req, res) => {
    console.log("findAllOrderById called")
    try {
        var role = req.token_decoded.r


        var allOrderData = req.body

        var result = await allOrdersHelper.findAllOrderById(allOrderData)

        var message = "AllOrder find successfully"
        if (result == null) {
            message = "AllOrder does not exists."
        }


        return responseHelper.success(res, result, message)

    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createAllOrder,
    getAllOrdersWithFullDetails,
    getAllOrdersList,
    updateAllOrder,
    removeAllOrder,
    findAllOrderById

}



