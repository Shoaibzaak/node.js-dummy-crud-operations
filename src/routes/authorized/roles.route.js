/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').roles

router.post('/createRole', permit(['_a', '_hr']), controller.createRole)
router.post('/getRolesWithFullDetails', permit(['_a', '_hr']), controller.getRolesWithFullDetails)
router.post('/updateRole', permit(['_a', '_hr']), controller.updateRole)
router.post('/removeRole', permit(['_a', '_hr']), controller.removeRole)
router.post('/findRoleById', permit(['_a', '_hr']), controller.findRoleById)
router.post('/addSinglePermissionToRole', permit(['_a', '_hr']), controller.addSinglePermissionToRole)
router.post('/addPermissionsToRole', permit(['_a', '_hr']), controller.addPermissionsToRole)
router.post('/removePermissionsFromRole', permit(['_a', '_hr']), controller.removePermissionsFromRole)


module.exports = router
