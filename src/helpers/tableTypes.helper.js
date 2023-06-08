/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose')

const TableType = mongoose.model('tableTypes')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createTableType: async (data) => {
        console.log("createTableType HelperFunction is called");
        const tableType = new TableType(data)
        await tableType.save()
        return tableType
        
    },
    getTableTypeWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getTableType Model Function called")

        const tableTypes = await TableType.find(query.critarion)
       
        .populate('addedby', query.addedby)
        .populate("branch", query.branchFields)
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const tableTypesize = tableTypes.length

        return {
            tableTypes: tableTypes,
            count: tableTypesize,
            offset: offset,
            limit: limit
        };
        
    },

    getTableTypeList: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getTableType Model Function called")

        const tableTypes = await TableType.find(query.critarion).select(query.fields/* '_id TableTypeName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const tableTypesize = tableTypes.length

        return {
            tableTypes: tableTypes,
            count: tableTypesize,
            offset: offset,
            limit: limit
        };
        
    },

    updateTableType: async (data) => {
        console.log("updateTableType HelperFunction is called");

        const result = await promise.all([TableType.findOneAndUpdate({_id: data.tableTypeid}, data, {new: true})])
        return result; 
                
    },

    

    removeTableType: async (data) => {
        console.log("removeTableType HelperFunction is called");

        const tableType = await TableType.findById(data.id);
        if(tableType == null){
             var error = "TableType does not exists."
             return error
        }
        tableType.lastModifiedBy = data.lastModifiedBy
        tableType.active = false
        tableType.save()
        return tableType;
        

    },

    findTableTypeById: async (query) => {
        console.log("findTableTypeById HelperFunction is called");
        
        const tableType = await TableType.findOne(query.critarion)
        
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return tableType;
        

    },

    

};
