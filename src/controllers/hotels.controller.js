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

const hotelHelper = require('../helpers/hotels.helper')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

var notificationCtrl = require("./notifications.controller");
//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)


var createHotel = async (req, res) => {
    console.log('createHotel')
    try {
        var hotelData = req.body
        // check()
        // hotelData.addedby = req.token_decoded.d


        var result = await hotelHelper.createHotel(hotelData)



        var message = "Hotel created successfully"
        return responseHelper.success(res, result, message)


    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getHotelsWithFullDetails = async (req, res) => {
    console.log("getHotelsWithFullDetails called")
    var hotelData = req.body


    try {

        var result = await hotelHelper.getHotelWithFullDetails(hotelData.sortproperty, hotelData.sortorder, hotelData.offset, hotelData.limit, hotelData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getHotelsList = async (req, res) => {
    console.log("getHotelsList called")
    var hotelData = req.body


    try {

        var result = await hotelHelper.getHotelList(hotelData.sortproperty, hotelData.sortorder, hotelData.offset, hotelData.limit, hotelData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateHotel = async (req, res) => {
    console.log("request received for updateHotel")

    var hotelData = req.body
    var role = req.token_decoded.r
    try {
        hotelData.lastModifiedBy = req.token_decoded.d

        var result = await hotelHelper.updateHotel(hotelData)


        var message = 'Hotel Updated successfully'


        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeHotel = async (req, res) => {
    console.log("removeHotel called")
    try {
        var role = req.token_decoded.r


        var hotelData = req.body
        hotelData.lastModifiedBy = req.token_decoded.d
        var result = await hotelHelper.removeHotel(hotelData)

        var message = "Hotel removed successfully"

        if (result == "Hotel does not exists.") {
            message = "Hotel does not exists."
        }


        return responseHelper.success(res, result, message)

    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findHotelById = async (req, res) => {
    console.log("findHotelById called")
    try {
        var role = req.token_decoded.r


        var hotelData = req.body

        var result = await hotelHelper.findHotelById(hotelData)

        var message = "Hotel find successfully"
        if (result == null) {
            message = "Hotel does not exists."
        }


        return responseHelper.success(res, result, message)

    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createHotel,
    getHotelsWithFullDetails,
    getHotelsList,
    updateHotel,
    removeHotel,
    findHotelById

}



