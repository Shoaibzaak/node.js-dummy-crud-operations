/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').permissions

router.post('/createPermission', permit(['_a', '_hr']), controller.createPermission)
router.post('/getPermissionsWithFullDetails', permit(['_a', '_hr']), controller.getPermissionsWithFullDetails)
router.post('/updatePermission', permit(['_a', '_hr']), controller.updatePermission)
router.post('/removePermission', permit(['_a', '_hr']), controller.removePermission)
router.post('/getPermissionsList', permit(['_a', '_hr']), controller.getPermissionsList)
router.post('/findPermissionById', permit(['_a', '_hr']), controller.findPermissionById)


module.exports = router
