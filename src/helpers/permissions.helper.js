/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose');



const Permission = mongoose.model('permissions')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createPermission: async (data) => {
        console.log("createPermission HelperFunction is called");
        const permission = new Permission(data)
        await permission.save()
        return permission
        
    },
    getPermissionsWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getPermissions Model Function called")

        const permissions = await Permission.find(query.critarion)
       
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const permissionssize = permissions.length

        return {
            permissions: permissions,
            count: permissionssize,
            offset: offset,
            limit: limit
        };
        
    },

    getPermissionsList: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getPermissions Model Function called")

        const permissions = await Permission.find(query.critarion).select(query.fields/* '_id PermissionName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const catgsize = permissions.length

        return {
            permissions: permissions,
            count: catgsize,
            offset: offset,
            limit: limit
        };
        
    },

    updatePermission: async (data) => {
        console.log("updatePermission HelperFunction is called");
        
        const result = await Permission.findOneAndUpdate({_id: data.permissionid}, data, {new: true})

        return result; 
                
    },

    

    removePermission: async (data) => {
        console.log("removePermission HelperFunction is called");

        const permission = await Permission.findById(data.id);
        if(permission == null){
             var error = "Permission does not exists."
             return error
        }
        permission.lastModifiedBy = data.lastModifiedBy
        permission.active = false
        permission.save()
        return permission;
        

    },

    findPermissionById: async (query) => {
        console.log("findPermissionById HelperFunction is called");
        
        const permission = await Permission.findOne(query.critarion)
        
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return permission;
        

    },

    

};
