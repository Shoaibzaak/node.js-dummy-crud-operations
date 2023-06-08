/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').tables

router.post('/createTable', permit(['_a']), controller.createTable)
router.post('/getTablesWithFullDetails', permit(['_a']), controller.getTablesWithFullDetails)
router.post('/updateTable', permit(['_a']), controller.updateTable)
router.post('/removeTable', permit(['_a']), controller.removeTable)
router.post('/getTablesList', permit(['_a']), controller.getTablesList)
router.post('/findTableById', permit(['_a']), controller.findTableById)



module.exports = router
