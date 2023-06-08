/**
 * Created by Mb
 */
 
const mongoose = require("mongoose")
const admin = require("firebase-admin")
const config = require('dotenv').config()

const responseHelper = require("../helpers/response.helper")

// models
const Notification = mongoose.model("Notification")
const User = mongoose.model("users")

const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants
const promise = require('bluebird')
//helper functions
logger = require("../helpers/logger")

const pageSize = parseInt(config.PAGE_SIZE)
const titles = {}
const messages = {
  markedAsRead: "Notification(s) have been marked as read",
  sent: "Notification has been sent successfully",
  removed: "Notification(s) removed successfully",
  fetched: "Notifications fetched successfully",
}

var createSampleNotification = async (req, res) => {
  console.log('createSampleNotification')
  try {
      var notificationData = req.body

      notificationData.addedby = req.token_decoded.d
      
      let ntif = new Notification(notificationData)
      await ntif.save()


      var contactName = call.contactName

                var notemsg = dispatcher+" placed a bid @"+reqData.bidAmount+" on "+contactName+ "\'s Call"

                let where = {role: "admin"}
                let admin = await User.findOne(where)
                
                const notf = await notificationCtrl.sendNotification("Bid Placement", notemsg, admin._id, admin._id, "Bid Placement", {})
      var message = "Building created successfully"
      return responseHelper.success(res, ntif, message)


  } catch (err) {
      logger.error(err)
      responseHelper.requestfailure(res, err)
  }
} //end function

// provide "notificationIds" array in body, otherwise it will mark all notifications as read

var markAsRead = async (req, res) => {
  console.log("markAsRead is called")
  try {

    var notificationIds = req.body.notificationIds
    if (notificationIds && notificationIds.length) {

      for (let notif of notificationIds) {
        let notifct = await Notification.findById(notif)
        notifct.isRead = true
        await notifct.save()

      }


    }

    responseHelper.success(res, {}, messages.markedAsRead)
  } catch (error) {
    responseHelper.systemfailure(res, error)
  }
}

var markAsReadOld = async (req, res) => {
  console.log("markAsRead is called")
  try {
    var myId = req.token_decoded.d

    var query = { userId: myId, isRead: false }
    var update = { isRead: true }
    var options = { multi: true, new: true }

    var notificationIds = req.body.notificationIds
    if (notificationIds && notificationIds.length) {
      query['_id'] = { $in: notificationIds }
    }

    var result = promise.Promise.all([ Notification.update(query, update, options)])

    responseHelper.success(res, result, messages.markedAsRead)
  } catch (error) {
    responseHelper.systemfailure(res, error)
  }
}

// mark notification as read based on "targetId" provided in params
var markAsReadByTargetId = async (req, res) => {
  console.log("markAsReadByTargetId is called")
  try {
    var myId = req.token_decoded.d
    var targetId = req.params.targetId

    var query = { userId: myId, targetId }
    var update = { isRead: true }
    var options = { multi: true, new: true }

    var result = await Notification.update(query, update, options)

    responseHelper.success(res, result, messages.markedAsRead)
  } catch (error) {
    responseHelper.systemfailure(res, error)
  }
}

// provide "notificationIds" array in body, otherwise it will delete all notifications
var deleteNotifications = async (req, res) => {
  console.log("deleteNotifications is called")
  try {
    var myId = req.token_decoded.d

    var query = { userId: myId }

    var notificationIds = req.body.notificationIds
    if (notificationIds && notificationIds.length) {
      query['_id'] = { $in: notificationIds }
    }

    var result = await Notification.remove(query)

    responseHelper.success(res, result, messages.removed)
  } catch (error) {
    responseHelper.systemfailure(res, error)
  }
}

var getNotifications = async (req, res) => {
  console.log("getNotifications is called")
  try {
    var myId = req.token_decoded.d

    console.log('myId: '+myId)

    var notificationData = req.body


    var page = notificationData.page ? parseInt(notificationData.page) : 1
    var skip = (page - 1) * pageSize

    var query = { userId: myId }

    if (notificationData.unread === "true") {
      query.isRead = false
    }

    //await Notification.update(query, { $set: { isRead: true } }, { multi: true })

    var [notifications, total, unreadCount] = await Promise.all([
      Notification.find(query).sort({ createdAt: -1 }).skip(skip).limit(pageSize).populate('userId', constants.selectUsersData).lean(),
      Notification.count(query),
      Notification.count({ isRead: false, userId: myId })
    ])

    responseHelper.success(res, { notifications, unreadCount, total, page, totalPages: Math.ceil(total / pageSize), pageSize }, messages.fetched)
  } catch (err) {
    // return res.status(500).json(respObj.internalError(err))
    responseHelper.systemfailure(res, err)
  }
}

var sendNewsNotification = ( message, userId,  title = "", data = "", attachedFileUrl = "", pauseNotification=false) => {
  console.log("sendNotification is called")
  return new Promise(async (resolve, reject) => {
    try {
      title = title || titles[type]

      if (!title) return reject("Title of notification must be specified")

      var notifData = {
        userId,
        message,
        title,
        attachedFileUrl,
        data: data
      }

      var newNotification = new Notification(notifData)
      var newNotification = await newNotification.save()
      if(!pauseNotification){
        await sendNewsNow( title, message, userId,  newNotification._id.toString(), data, attachedFileUrl)
      }
      
      resolve(newNotification)
    } catch (error) {
      reject(error)
    }
  })
}

var sendNewsNow = ( title, message, userId,  notificationId, data="", attachedFileUrl = "") => {
  return new Promise(async (resolve, reject) => {
    console.log("sendNow is called")
    try {

      var results = await Promise.all([
        User.findById(userId).lean(),
        Notification.count({ userId, isRead: false })
      ])
      var user = results[0]
      
      var badge = results[1]

      if (!user) {
        return reject("User not found")
      }

      // if((!user.enable_invite_notification && type == notificationtexts.referrer.type) || (!user.enable_review_notification && type == notificationtexts.review.type))
      // {
      //   logger.info(type + " type notifications are disabled by user")
      //   return resolve(type + " type notifications are disabled by user")
      // }

      if (!user.fcm_tokens) {
        logger.info("No fcm_tokens found against this user")
        return resolve("No fcm_tokens found against this user")
      }

      

        var androidData = {
          title,
          notificationId,
          attachedFileUrl,
          body: message,
          badge: badge.toString(),
          data: JSON.stringify(data)
        }

        var iosData = {
          
          notificationId,
          notificationId,
          attachedFileUrl
        }

        var payload = {}

        
        /* const testToken = "fY6_DGfGQ06OW4BUVEsEwG:APA91bGUFza2uhaaR0miN2jtY0ut7RuA5ObleZvqv2X8KLOBgksmDmgc9sHDdea-DBvHmz1aUwX1uhkysk92x50WQCLHPDD1VwGX5ybKhUwVdq4aBfI24vhXqMB-FksWXEZwzDAi9BA_" */
        if (user.fcm_tokens.deviceType === 'android') {
          payload = { data: androidData }
          var options = { priority: "high", timeToLive: 60 * 60 * 24 }
          var response = await admin.messaging().sendToDevice(user.fcm_tokens.token, payload, options)


          console.log(response)
          console.log('\n')
          console.log(response.successCount ? "Following notification SENT successfully:" : 'Following notification FAILED:')
          console.log(title, message)

          if (response.results && response.results[0].error) {
            console.log(response.results[0].error)
          }

          resolve(messages.sent)
        } else {
          payload = {
            data: iosData,
            notification: {
              title,
              body: message,
              data: JSON.stringify(data)
            }
          }
          var options = { priority: "high", timeToLive: 60 * 60 * 24 }
          var response = await admin.messaging().sendToDevice(user.fcm_tokens.token, payload, options)

          console.log(response)
          console.log('\n')
          console.log(response.successCount ? "Following notification SENT successfully:" : 'Following notification FAILED:')
          console.log(title, message)

          if (response.results && response.results[0].error) {
            console.log(response.results[0].error)
          }

          resolve(messages.sent)
        }

        

    } catch (error) {
      reject(error)
    }
  })
}

var sendNotification = ( message, userId,  title = "", data = "") => {
  console.log("sendNotification is called")
  return new Promise(async (resolve, reject) => {
    try {
      title = title || titles[type]

      if (!title) return reject("Title of notification must be specified")

      var notifData = {
        userId,
        message,
        title,
        data: data
      }

      var newNotification = new Notification(notifData)
      var newNotification = await newNotification.save()
      await sendNow( title, message, userId,  newNotification._id.toString(), data)
      resolve(newNotification)
    } catch (error) {
      reject(error)
    }
  })
}

var sendNotificationOld = ( message, userId,  title = "", data = "") => {
  console.log("sendNotification is called")
  return new Promise(async (resolve, reject) => {
    try {
      title = title || titles[type]

      if (!title) return reject("Title of notification must be specified")

      var notifData = {
        userId,
        message,
        title,
        data: data
      }

      var newNotification = new Notification(notifData)
      var newNotification = await newNotification.save()
      await sendNow( title, message, userId,  newNotification._id.toString(), data)
      resolve(newNotification)
    } catch (error) {
      reject(error)
    }
  })
}


var sendNow = ( title, message, userId,  notificationId, data="") => {
  return new Promise(async (resolve, reject) => {
    console.log("sendNow is called")
    try {

      var results = await Promise.all([
        User.findById(userId).lean(),
        Notification.count({ userId, isRead: false })
      ])
      var user = results[0]
      
      var badge = results[1]

      if (!user) {
        return reject("User not found")
      }

      // if((!user.enable_invite_notification && type == notificationtexts.referrer.type) || (!user.enable_review_notification && type == notificationtexts.review.type))
      // {
      //   logger.info(type + " type notifications are disabled by user")
      //   return resolve(type + " type notifications are disabled by user")
      // }

      if (!user.fcm_tokens) {
        logger.info("No fcm_tokens found against this user")
        return resolve("No fcm_tokens found against this user")
      }

      

        var androidData = {
          title,
          notificationId,
          body: message,
          badge: badge.toString(),
          data: JSON.stringify(data)
        }

        var iosData = {
          
          notificationId,
          notificationId
        }

        var payload = {}

        
        /* const testToken = "fY6_DGfGQ06OW4BUVEsEwG:APA91bGUFza2uhaaR0miN2jtY0ut7RuA5ObleZvqv2X8KLOBgksmDmgc9sHDdea-DBvHmz1aUwX1uhkysk92x50WQCLHPDD1VwGX5ybKhUwVdq4aBfI24vhXqMB-FksWXEZwzDAi9BA_" */
        if (user.fcm_tokens.deviceType === 'android') {
          payload = { data: androidData }
          var options = { priority: "high", timeToLive: 60 * 60 * 24 }
          var response = await admin.messaging().sendToDevice(user.fcm_tokens.token, payload, options)


          console.log(response)
          console.log('\n')
          console.log(response.successCount ? "Following notification SENT successfully:" : 'Following notification FAILED:')
          console.log(title, message)

          if (response.results && response.results[0].error) {
            console.log(response.results[0].error)
          }

          resolve(messages.sent)
        } else {
          payload = {
            data: iosData,
            notification: {
              title,
              body: message,
              data: JSON.stringify(data)
            }
          }
          var options = { priority: "high", timeToLive: 60 * 60 * 24 }
          var response = await admin.messaging().sendToDevice(user.fcm_tokens.token, payload, options)

          console.log(response)
          console.log('\n')
          console.log(response.successCount ? "Following notification SENT successfully:" : 'Following notification FAILED:')
          console.log(title, message)

          if (response.results && response.results[0].error) {
            console.log(response.results[0].error)
          }

          resolve(messages.sent)
        }

        

    } catch (error) {
      reject(error)
    }
  })
}

var sendSampleNotificationToAll = async (req, res) => {
  console.log("sendSampleNotificationToAll is called")
  try {
    var users = await User.find({}, { fcm_tokens: 1, name: 1 }).lean()
    console.log(users)

    for (let user of users) {
      if (user.fcm_tokens && user.fcm_tokens.length) {
        sendNotification('welcome', "Welcome to EFS App", user._id.toString(), user._id.toString(), `Hi ${user.name}!`)
      }
    }

    responseHelper.success(res, {}, "Sample notifications sent to all users")
  } catch (error) { responseHelper.systemfailure(res, error) }
}

var getUnreadCount = (userId) => {
  console.log("getUnreadCount is called")
  return new Promise(async (resolve, reject) => {
    try {
      resolve(await Notification.count({ userId, isRead: false }))
    } catch (error) {
      reject(error)
    }
  })
}

var enableOrDisableNotifications = async (req, res) => {
  console.log("enableOrDisableNotifications is called")
  try {
    var myId = req.token_decoded.d
    var toUpdate = {
      enable_invite_notification: req.body.enable_invite_notification,
      enable_review_notification: req.body.enable_review_notification
    }

    // var users = await User.find({_id: myId})
    var users = await User.findOneAndUpdate({_id: myId}, toUpdate, {new: true})

    responseHelper.success(res, {}, "successfully done")
  } catch (error) { responseHelper.systemfailure(res, error) }
}

var getAllNotifications = async (req, res) => {
  console.log("getNotifications is called")
  try {
    var myId = req.token_decoded.d

    

    var [notifications] = await Promise.all([
      Notification.find({})
      .sort({ createdAt: -1 })
      /* .skip(skip)
      .limit(pageSize) */
      .populate('userId', constants.selectUsersData)
      //.populate('targetId', constants.selectUsersData)
      .lean(),
      
    ])

    responseHelper.success(res, { notifications}, messages.fetched)
  } catch (err) {
    // return res.status(500).json(respObj.internalError(err))
    responseHelper.systemfailure(res, err)
  }
}

module.exports = {
  getUnreadCount,
  sendSampleNotificationToAll,
  sendNow,
  markAsRead,
  markAsReadByTargetId,
  deleteNotifications,
  sendNotification,
  sendNewsNotification,
  getNotifications,
  enableOrDisableNotifications,
  createSampleNotification,
  getAllNotifications
}
