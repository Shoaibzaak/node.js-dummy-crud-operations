/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose')

const RestBranch = mongoose.model('restBranches')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createRestBranch: async (data) => {
        console.log("createRestBranch HelperFunction is called");
        const restBranch = new RestBranch(data)
        await restBranch.save()
        return restBranch
        
    },
    getRestBranchWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getRestBranch Model Function called")

        const restBranchs = await RestBranch.find(query.critarion)
       
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const restBranchsize = restBranchs.length

        return {
            restBranchs: restBranchs,
            count: restBranchsize,
            offset: offset,
            limit: limit
        };
        
    },

    getRestBranchList: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getRestBranch Model Function called")

        const restBranchs = await RestBranch.find(query.critarion).select(query.fields/* '_id RestBranchName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const restBranchsize = restBranchs.length

        return {
            restBranchs: restBranchs,
            count: restBranchsize,
            offset: offset,
            limit: limit
        };
        
    },

    updateRestBranch: async (data) => {
        console.log("updateRestBranch HelperFunction is called");

        const result = await promise.all([RestBranch.findOneAndUpdate({_id: data.restBranchid}, data, {new: true})])
        return result; 
                
    },

    

    removeRestBranch: async (data) => {
        console.log("removeRestBranch HelperFunction is called");

        const restBranch = await RestBranch.findById(data.id);
        if(restBranch == null){
             var error = "RestBranch does not exists."
             return error
        }
        restBranch.lastModifiedBy = data.lastModifiedBy
        restBranch.active = false
        restBranch.save()
        return restBranch;
        

    },

    findRestBranchById: async (query) => {
        console.log("findRestBranchById HelperFunction is called");
        
        const restBranch = await RestBranch.findOne(query.critarion)
        
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return restBranch;
        

    },

    

};
