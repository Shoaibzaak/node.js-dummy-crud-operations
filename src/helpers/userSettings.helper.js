/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose')

const UserSetting = mongoose.model('userSettings')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createUserSetting: async (data) => {
        console.log("createUserSetting HelperFunction is called");
        const userSetting = new UserSetting(data)
        await userSetting.save()
        return userSetting
        
    },
    getUserSettingWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getUserSetting Model Function called")

        const userSettings = await UserSetting.find(query.critarion)
       
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const userSettingsize = userSettings.length

        return {
            userSettings: userSettings,
            count: userSettingsize,
            offset: offset,
            limit: limit
        };
        
    },

    getUserSettingList: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getUserSetting Model Function called")

        const userSettings = await UserSetting.find(query.critarion).select(query.fields/* '_id UserSettingName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const userSettingsize = userSettings.length

        return {
            userSettings: userSettings,
            count: userSettingsize,
            offset: offset,
            limit: limit
        };
        
    },

    updateUserSetting: async (data) => {
        console.log("updateUserSetting HelperFunction is called");
        
        const result = await UserSetting.findOneAndUpdate({_id: data.userSettingid}, data, {new: true})

        return result; 
                
    },

    

    removeUserSetting: async (data) => {
        console.log("removeUserSetting HelperFunction is called");

        const userSetting = await UserSetting.findById(data.id);
        if(userSetting == null){
             var error = "UserSetting does not exists."
             return error
        }
        userSetting.lastModifiedBy = data.lastModifiedBy
        userSetting.active = false
        userSetting.save()
        return userSetting;
        

    },

    findUserSettingById: async (query) => {
        console.log("findUserSettingById HelperFunction is called");
        
        const userSetting = await UserSetting.findOne(query.critarion)
        
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return userSetting;
        

    },

    

};
