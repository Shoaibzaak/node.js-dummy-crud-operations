/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').todaysMenu

router.post('/createTodaysMenu', permit(['_a']), controller.createTodaysMenu)
router.post('/getTodaysMenusWithFullDetails', permit(['_a']), controller.getTodaysMenusWithFullDetails)
router.post('/updateTodaysMenu', permit(['_a']), controller.updateTodaysMenu)
router.post('/removeTodaysMenu', permit(['_a']), controller.removeTodaysMenu)
router.post('/getTodaysMenusList', permit(['_a']), controller.getTodaysMenusList)
router.post('/findTodaysMenuById', permit(['_a']), controller.findTodaysMenuById)



module.exports = router
