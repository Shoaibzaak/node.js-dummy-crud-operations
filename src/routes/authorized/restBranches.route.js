/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').restBranches

router.post('/createRestBranch', permit(['_a']), controller.createRestBranch)
router.post('/getRestBranchsWithFullDetails', permit(['_a']), controller.getRestBranchsWithFullDetails)
router.post('/updateRestBranch', permit(['_a']), controller.updateRestBranch)
router.post('/removeRestBranch', permit(['_a']), controller.removeRestBranch)
router.post('/getRestBranchsList', permit(['_a']), controller.getRestBranchsList)
router.post('/findRestBranchById', permit(['_a']), controller.findRestBranchById)



module.exports = router
