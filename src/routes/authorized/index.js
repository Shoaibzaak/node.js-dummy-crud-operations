
const express = require('express')
const router = express.Router()

//get defined routes
const usersRoutes = require('./users.route')
const permissionRoutes = require('./permissions.route')
const rolesRoutes = require('./roles.route')
const notificationRoutes = require('./notification.route')
const userSettingRoutes = require('./userSettings.route')

const hotelRoutes = require('./hotels.route')

const restBranchRoutes = require('./restBranches.route')
const dishCategoriesRoutes = require('./dishCategories.route')
const dishesRoutes = require('./dishes.route')
const tableTypeRoutes = require('./tableTypes.route')
const tableRoutes = require('./tables.route')
const tableOrderRoutes = require('./tableOrders.route')
const todaysMenuTemplateRoutes = require('./todaysMenuTemplate.route')
const todaysMenuRoutes = require('./todaysMenu.route')
const allOrderRoutes = require('./allOrders.route')


//call appropriate routes
router.use ('/users', usersRoutes)
router.use('/userSettings', userSettingRoutes)
router.use ('/permissions', permissionRoutes)
router.use ('/roles', rolesRoutes)
router.use ('/notifications', notificationRoutes)
router.use ('/hotels', hotelRoutes)
router.use ('/restBranches', restBranchRoutes)
router.use ('/dishCategories', dishCategoriesRoutes)
router.use ('/dishes', dishesRoutes)
router.use ('/tableTypes', tableTypeRoutes)
router.use ('/tables', tableRoutes)
router.use ('/tableOrders', tableOrderRoutes)
router.use ('/todaysMenuTemplates', todaysMenuTemplateRoutes)
router.use ('/todaysMenus', todaysMenuRoutes)
router.use ('/allOrders', allOrderRoutes)



module.exports = router
