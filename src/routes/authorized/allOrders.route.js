/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').allOrders

router.post('/createAllOrder', permit(['_a']), controller.createAllOrder)
router.post('/getAllOrdersWithFullDetails', permit(['_a']), controller.getAllOrdersWithFullDetails)
router.post('/updateAllOrder', permit(['_a']), controller.updateAllOrder)
router.post('/removeAllOrder', permit(['_a']), controller.removeAllOrder)
router.post('/getAllOrdersList', permit(['_a']), controller.getAllOrdersList)
router.post('/findAllOrderById', permit(['_a']), controller.findAllOrderById)



module.exports = router
