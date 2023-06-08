/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose')

const AllOrders = mongoose.model('allOrders')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createAllOrder: async (data) => {
        console.log("createAllOrders HelperFunction is called");
        const allOrders = new AllOrders(data)
        await allOrders.save()
        return allOrders
        
    },
    getAllOrderWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getAllOrders Model Function called")

        const allOrderss = await AllOrders.find(query.critarion)
       
        .populate('addedby', query.addedby)
        .populate("branch", query.branchFields)
        .populate("table",query.tableFields)
        .populate("dishes", query.dishFields)
        .populate("todaysMenu", query.todaysMenuFields)
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const allOrderssize = allOrderss.length

        return {
            allOrderss: allOrderss,
            count: allOrderssize,
            offset: offset,
            limit: limit
        };
        
    },

    getAllOrderList: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getAllOrders Model Function called")

        const allOrderss = await AllOrders.find(query.critarion).select(query.fields/* '_id AllOrdersName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const allOrderssize = allOrderss.length

        return {
            allOrderss: allOrderss,
            count: allOrderssize,
            offset: offset,
            limit: limit
        };
        
    },

    updateAllOrder: async (data) => {
        console.log("updateAllOrders HelperFunction is called");

        const result = await promise.all([AllOrders.findOneAndUpdate({_id: data.allOrdersid}, data, {new: true})])
        return result; 
                
    },

    

    removeAllOrder: async (data) => {
        console.log("removeAllOrders HelperFunction is called");

        const allOrders = await AllOrders.findById(data.id);
        if(AllOrders == null){
             var error = "AllOrders does not exists."
             return error
        }
        allOrders.lastModifiedBy = data.lastModifiedBy
        allOrders.active = false
        allOrders.save()
        return allOrders;
        

    },

    findAllOrderById: async (query) => {
        console.log("findAllOrdersById HelperFunction is called");
        
        const allOrders = await AllOrders.findOne(query.critarion)
        
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return allOrders;
        

    },

    

};
