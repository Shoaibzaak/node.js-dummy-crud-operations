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

const userSettingHelper = require('../helpers/userSettings.helper')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

var notificationCtrl = require("./notifications.controller");
//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)


var createUserSetting = async (req, res) => {
    console.log('createUserSetting')
    try {
        var userSettingData = req.body

        userSettingData.addedby = req.token_decoded.d

        var result = await userSettingHelper.createUserSetting(userSettingData)


        /*var contactName = call.contactName;

                  var notemsg = dispatcher+" placed a bid @"+reqData.bidAmount+" on "+contactName+ "\'s Call";

                  let where = {role: "admin"};
                  let admin = await User.findOne(where)
                  
                  const notf = await notificationCtrl.sendNotification("Bid Placement", notemsg, admin._id, admin._id, "Bid Placement", {})*/
        var message = "UserSetting created successfully"
        return responseHelper.success(res, result, message)


    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getUserSettingsWithFullDetails = async (req, res) => {
    console.log("getUserSettingsWithFullDetails called")
    var userSettingData = req.body


    try {

        var result = await userSettingHelper.getUserSettingWithFullDetails(userSettingData.sortproperty, userSettingData.sortorder, userSettingData.offset, userSettingData.limit, userSettingData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getUserSettingsList = async (req, res) => {
    console.log("getUserSettingsList called")
    var userSettingData = req.body


    try {

        var result = await userSettingHelper.getUserSettingList(userSettingData.sortproperty, userSettingData.sortorder, userSettingData.offset, userSettingData.limit, userSettingData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateUserSetting = async (req, res) => {
    console.log("request received for updateUserSetting")

    var userSettingData = req.body
    var role = req.token_decoded.r
    try {
        userSettingData.lastModifiedBy = req.token_decoded.d

        var result = await userSettingHelper.updateUserSetting(userSettingData)

        /*var contactName = call.contactName;

                  var notemsg = dispatcher+" placed a bid @"+reqData.bidAmount+" on "+contactName+ "\'s Call";

                  let where = {role: "admin"};
                  let admin = await User.findOne(where)
                  
                  const notf = await notificationCtrl.sendNotification("Bid Placement", notemsg, admin._id, admin._id, "Bid Placement", {})*/
        var message = 'UserSetting Updated successfully'


        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeUserSetting = async (req, res) => {
    console.log("removeUserSetting called")
    try {
        var role = req.token_decoded.r


        var userSettingData = req.body
        userSettingData.lastModifiedBy = req.token_decoded.d
        var result = await userSettingHelper.removeUserSetting(userSettingData)

        var message = "UserSetting removed successfully"

        if (result == "UserSetting does not exists.") {
            message = "UserSetting does not exists."
        }

        /*var contactName = call.contactName;

                  var notemsg = dispatcher+" placed a bid @"+reqData.bidAmount+" on "+contactName+ "\'s Call";

                  let where = {role: "admin"};
                  let admin = await User.findOne(where)
                  
                  const notf = await notificationCtrl.sendNotification("Bid Placement", notemsg, admin._id, admin._id, "Bid Placement", {})*/
        return responseHelper.success(res, result, message)

    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findUserSettingById = async (req, res) => {
    console.log("findUserSettingById called")
    try {
        var role = req.token_decoded.r


        var userSettingData = req.body

        var result = await userSettingHelper.findUserSettingById(userSettingData)

        var message = "UserSetting find successfully"
        if (result == null) {
            message = "UserSetting does not exists."
        }


        return responseHelper.success(res, result, message)

    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createUserSetting,
    getUserSettingsWithFullDetails,
    getUserSettingsList,
    updateUserSetting,
    removeUserSetting,
    findUserSettingById

}



