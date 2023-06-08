/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose')

const Table = mongoose.model('tables')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createTable: async (data) => {
        console.log("createTable HelperFunction is called");
        const table = new Table(data)
        await table.save()
        return table
        
    },
    getTableWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getTable Model Function called")

        const tables = await Table.find(query.critarion)
       
        .populate('addedby', query.addedby)
        .populate("branch", query.branchFields)
        .populate("tableType", query.tableTypeFields)
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const tablesize = tables.length

        return {
            tables: tables,
            count: tablesize,
            offset: offset,
            limit: limit
        };
        
    },

    getTableList: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getTable Model Function called")

        const tables = await Table.find(query.critarion).select(query.fields/* '_id TableName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const tablesize = tables.length

        return {
            tables: tables,
            count: tablesize,
            offset: offset,
            limit: limit
        };
        
    },

    updateTable: async (data) => {
        console.log("updateTable HelperFunction is called");

        const result = await promise.all([Table.findOneAndUpdate({_id: data.tableid}, data, {new: true})])
        return result; 
                
    },

    

    removeTable: async (data) => {
        console.log("removeTable HelperFunction is called");

        const table = await Table.findById(data.id);
        if(Table == null){
             var error = "Table does not exists."
             return error
        }
        table.lastModifiedBy = data.lastModifiedBy
        table.active = false
        table.save()
        return table;
        

    },

    findTableById: async (query) => {
        console.log("findTableById HelperFunction is called");
        
        const table = await Table.findOne(query.critarion)
        
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return table;
        

    },

    

};
