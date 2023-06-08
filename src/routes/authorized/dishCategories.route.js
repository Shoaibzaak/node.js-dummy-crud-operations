/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').dishCategories

router.post('/createDishCategory', permit(['_a']), controller.createDishCategory)
router.post('/getDishCategorysWithFullDetails', permit(['_a']), controller.getDishCategorysWithFullDetails)
router.post('/updateDishCategory', permit(['_a']), controller.updateDishCategory)
router.post('/removeDishCategory', permit(['_a']), controller.removeDishCategory)
router.post('/getDishCategorysList', permit(['_a']), controller.getDishCategorysList)
router.post('/findDishCategoryById', permit(['_a']), controller.findDishCategoryById)



module.exports = router
