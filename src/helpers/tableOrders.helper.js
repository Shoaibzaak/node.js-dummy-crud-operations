/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose')

const TableOrder = mongoose.model('tableOrders')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createTableOrder: async (data) => {
        console.log("createTableOrder HelperFunction is called");
        const tableOrder = new TableOrder(data)
        await tableOrder.save()
        return tableOrder
        
    },
    getTableOrderWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getTableOrder Model Function called")

        const tableOrders = await TableOrder.find(query.critarion)
       
        .populate('addedby', query.addedby)
        .populate("branch", query.branchFields)
        .populate("table", query.tableFields)
        .populate("order", query.orderFields)
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const tableOrdersize = tableOrders.length

        return {
            tableOrders: tableOrders,
            count: tableOrdersize,
            offset: offset,
            limit: limit
        };
        
    },

    getTableOrderList: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getTableOrder Model Function called")

        const tableOrders = await TableOrder.find(query.critarion).select(query.fields/* '_id TableOrderName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const tableOrdersize = tableOrders.length

        return {
            tableOrders: tableOrders,
            count: tableOrdersize,
            offset: offset,
            limit: limit
        };
        
    },

    updateTableOrder: async (data) => {
        console.log("updateTableOrder HelperFunction is called");

        const result = await promise.all([TableOrder.findOneAndUpdate({_id: data.tableOrderid}, data, {new: true})])
        return result; 
                
    },

    

    removeTableOrder: async (data) => {
        console.log("removeTableOrder HelperFunction is called");

        const tableOrder = await TableOrder.findById(data.id);
        if(TableOrder == null){
             var error = "TableOrder does not exists."
             return error
        }
        tableOrder.lastModifiedBy = data.lastModifiedBy
        tableOrder.active = false
        tableOrder.save()
        return tableOrder;
        

    },

    findTableOrderById: async (query) => {
        console.log("findTableOrderById HelperFunction is called");
        
        const tableOrder = await TableOrder.findOne({_id: query.id})
        
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return tableOrder;
        

    },

    

};
