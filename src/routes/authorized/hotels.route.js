/**
 * Created by Jamshaid.
 */

const express = require('express')
const router = express.Router()
const validation = require('../../middlewares').validator

const controller = require('../../controllers').hotels
router.post('/createHotel', validation,controller.createHotel)
router.post('/getHotelsWithFullDetails', controller.getHotelsWithFullDetails)
router.post('/updateHotel', controller.updateHotel)
router.post('/removeHotel', controller.removeHotel)
router.post('/getHotelsList', controller.getHotelsList)
router.post('/findHotelById', controller.findHotelById)
// 
// permit(['_a'])

module.exports = router
