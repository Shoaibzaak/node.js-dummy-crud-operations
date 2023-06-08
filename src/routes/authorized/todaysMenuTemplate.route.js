/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').todaysMenuTemplate

router.post('/createTodaysMenuTemplate', permit(['_a']), controller.createTodaysMenuTemplate)
router.post('/getTodaysMenuTemplatesWithFullDetails', permit(['_a']), controller.getTodaysMenuTemplatesWithFullDetails)
router.post('/updateTodaysMenuTemplate', permit(['_a']), controller.updateTodaysMenuTemplate)
router.post('/removeTodaysMenuTemplate', permit(['_a']), controller.removeTodaysMenuTemplate)
router.post('/getTodaysMenuTemplatesList', permit(['_a']), controller.getTodaysMenuTemplatesList)
router.post('/findTodaysMenuTemplateById', permit(['_a']), controller.findTodaysMenuTemplateById)



module.exports = router
