/**
 * Created by Mb
 */

const express = require('express')
const router = express.Router()

const controller = require('../../controllers').notifications

router.get('/', controller.getNotifications)
router.post('/markAsRead', controller.markAsRead)
router.post('/mark-as-read/targetId/:targetId', controller.markAsReadByTargetId)
router.post('/clear', controller.deleteNotifications)
router.post('/sendSampleNotificationToAll', controller.sendSampleNotificationToAll)
router.post('/enable-or-disable-notifications', controller.enableOrDisableNotifications)
router.post('/getNotifications', controller.getNotifications)
router.post('/createSampleNotification', controller.createSampleNotification)
router.post('/getAllNotifications', controller.getAllNotifications)


module.exports = router
