/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').tableOrders

router.post('/createTableOrder', permit(['_a']), controller.createTableOrder)
router.post('/getTableOrdersWithFullDetails', permit(['_a']), controller.getTableOrdersWithFullDetails)
router.post('/updateTableOrder', permit(['_a']), controller.updateTableOrder)
router.post('/removeTableOrder', permit(['_a']), controller.removeTableOrder)
router.post('/getTableOrdersList', permit(['_a']), controller.getTableOrdersList)
router.post('/findTableOrderById', permit(['_a']), controller.findTableOrderById)



module.exports = router
