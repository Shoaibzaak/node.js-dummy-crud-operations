/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit
const {allRolesPermitted} = require('../../hardCodedData/constants')

const controller = require('../../controllers').userSettings

router.post('/createUserSetting', permit(allRolesPermitted), controller.createUserSetting)
router.post('/getUserSettingsWithFullDetails', permit(allRolesPermitted), controller.getUserSettingsWithFullDetails)
router.post('/updateUserSetting', permit(allRolesPermitted), controller.updateUserSetting)
router.post('/removeUserSetting', permit(allRolesPermitted), controller.removeUserSetting)
router.post('/getUserSettingsList', permit(allRolesPermitted), controller.getUserSettingsList)
router.post('/findUserSettingById', permit(allRolesPermitted), controller.findUserSettingById)



module.exports = router
