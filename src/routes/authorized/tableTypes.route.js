/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').tableTypes

router.post('/createTableType', permit(['_a']), controller.createTableType)
router.post('/getTableTypesWithFullDetails', permit(['_a']), controller.getTableTypesWithFullDetails)
router.post('/updateTableType', permit(['_a']), controller.updateTableType)
router.post('/removeTableType', permit(['_a']), controller.removeTableType)
router.post('/getTableTypesList', permit(['_a']), controller.getTableTypesList)
router.post('/findTableTypeById', permit(['_a']), controller.findTableTypeById)



module.exports = router
