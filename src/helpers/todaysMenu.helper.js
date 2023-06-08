/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose')

const TodaysMenu = mongoose.model('todaysMenu')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createTodaysMenu: async (data) => {
        console.log("createTodaysMenu HelperFunction is called");
        const todaysMenu = new TodaysMenu(data)
        await todaysMenu.save()
        return todaysMenu
        
    },
    getTodaysMenuWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getTodaysMenu Model Function called")

        const todaysMenus = await TodaysMenu.find(query.critarion)
       
        .populate('addedby', query.addedby)
        .populate("branch", query.branchFields)
        .populate("todaysMenuTemplate", query.menuTemplateFields)
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const todaysMenusize = todaysMenus.length

        return {
            todaysMenus: todaysMenus,
            count: todaysMenusize,
            offset: offset,
            limit: limit
        };
        
    },

    getTodaysMenuList: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getTodaysMenu Model Function called")

        const todaysMenus = await TodaysMenu.find(query.critarion).select(query.fields/* '_id TodaysMenuName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const todaysMenusize = todaysMenus.length

        return {
            todaysMenus: todaysMenus,
            count: todaysMenusize,
            offset: offset,
            limit: limit
        };
        
    },

    updateTodaysMenu: async (data) => {
        console.log("updateTodaysMenu HelperFunction is called");

        const result = await promise.all([TodaysMenu.findOneAndUpdate({_id: data.todaysMenuid}, data, {new: true})])
        return result; 
                
    },

    

    removeTodaysMenu: async (data) => {
        console.log("removeTodaysMenu HelperFunction is called");

        const todaysMenu = await TodaysMenu.findById(data.id);
        if(todaysMenu == null){
             var error = "TodaysMenu does not exists."
             return error
        }
        todaysMenu.lastModifiedBy = data.lastModifiedBy
        todaysMenu.active = false
        todaysMenu.save()
        return todaysMenu;
        

    },

    findTodaysMenuById: async (query) => {
        console.log("findTodaysMenuById HelperFunction is called");
        
        const todaysMenu = await TodaysMenu.findOne(query.critarion)
        
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return todaysMenu;
        

    },

    

};
