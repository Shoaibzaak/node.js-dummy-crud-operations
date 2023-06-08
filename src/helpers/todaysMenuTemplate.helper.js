/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose')

const TodaysMenuTemplate = mongoose.model('todaysMenuTemplate')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createTodaysMenuTemplate: async (data) => {
        console.log("createTodaysMenuTemplate HelperFunction is called");
        const todaysMenuTemplate = new TodaysMenuTemplate(data)
        await todaysMenuTemplate.save()
        return todaysMenuTemplate
        
    },
    getTodaysMenuTemplateWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getTodaysMenuTemplate Model Function called")

        const todaysMenuTemplates = await TodaysMenuTemplate.find(query.critarion)
       
        .populate('addedby', query.addedby)
        .populate("branch", query.branchFields)
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const todaysMenuTemplatesize = todaysMenuTemplates.length

        return {
            todaysMenuTemplates: todaysMenuTemplates,
            count: todaysMenuTemplatesize,
            offset: offset,
            limit: limit
        };
        
    },

    getTodaysMenuTemplateList: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getTodaysMenuTemplate Model Function called")

        const todaysMenuTemplates = await TodaysMenuTemplate.find(query.critarion).select(query.fields/* '_id TodaysMenuTemplateName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const todaysMenuTemplatesize = todaysMenuTemplates.length

        return {
            todaysMenuTemplates: todaysMenuTemplates,
            count: todaysMenuTemplatesize,
            offset: offset,
            limit: limit
        };
        
    },

    updateTodaysMenuTemplate: async (data) => {
        console.log("updateTodaysMenuTemplate HelperFunction is called", data);

        const result = await promise.all([TodaysMenuTemplate.findOneAndUpdate({_id: data.todaysMenuTemplateid}, data, {new: true})])
        return result; 
                
    },

    

    removeTodaysMenuTemplate: async (data) => {
        console.log("removeTodaysMenuTemplate HelperFunction is called");

        const todaysMenuTemplate = await TodaysMenuTemplate.findById(data.id);
        if(todaysMenuTemplate == null){
             var error = "TodaysMenuTemplate does not exists."
             return error
        }
        todaysMenuTemplate.lastModifiedBy = data.lastModifiedBy
        todaysMenuTemplate.active = false
        todaysMenuTemplate.save()
        return todaysMenuTemplate;
        

    },

    findTodaysMenuTemplateById: async (query) => {
        console.log("findTodaysMenuTemplateById HelperFunction is called");
        
        const todaysMenuTemplate = await TodaysMenuTemplate.findOne(query.critarion)
        
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return todaysMenuTemplate;
        

    },

    

};
