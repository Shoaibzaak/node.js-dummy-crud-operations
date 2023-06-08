/**
 * Controllers are exported for connecting them with routes
 */
 
module.exports = {
  user: require("./user.controller"),  
  notifications: require("./notifications.controller"),
  permissions: require('./permission.controller'),
  roles: require('./roles.controller'),
  hotels: require('./hotels.controller'),
  
  userSettings: require('./userSettings.controller'),

  restBranches: require('./restBranches.controller'),
  dishCategories: require('./dishCategories.controller'),
  dishes : require('./dishes.controller'),
  tableTypes: require('./tableTypes.controller'),
  tables: require('./tables.controller'),
  tableOrders: require('./tableOrders.controller'),
  todaysMenuTemplate: require('./todaysMenuTemplate.controller'),
  todaysMenu: require('./todaysMenu.controller'),
  allOrders: require('./allOrders.controller')
  
};
