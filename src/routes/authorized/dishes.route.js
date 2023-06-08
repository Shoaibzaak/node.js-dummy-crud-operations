/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').dishes

router.post('/createDish', permit(['_a']), controller.createDish)
router.post('/getDishsWithFullDetails', permit(['_a']), controller.getDishsWithFullDetails)
router.post('/updateDish', permit(['_a']), controller.updateDish)
router.post('/removeDish', permit(['_a']), controller.removeDish)
router.post('/getDishsList', permit(['_a']), controller.getDishsList)
router.post('/findDishById', permit(['_a']), controller.findDishById)



module.exports = router
