/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose');

const Role = mongoose.model('roles')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createRole: async (data) => {
        console.log("createRole HelperFunction is called");
        const role = new Role(data)
        await role.save()
        return role
        
    },
    getRolesWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getRoles Model Function called")

        const roles = await Role.find(query.critarion)
        .populate('permissions', query.permissions)
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const rolessize = roles.length

        return {
            roles: roles,
            count: rolessize,
            offset: offset,
            limit: limit
        };
        
    },

    getRolesList: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getRoles Model Function called")

        const roles = await Role.find(query.critarion).select(query.fields/* '_id RoleName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const catgsize = roles.length

        return {
            roles: roles,
            count: catgsize,
            offset: offset,
            limit: limit
        };
        
    },

    updateRole: async (data) => {
        console.log("updateRole HelperFunction is called");
        const constants = require("../hardCodedData").constants

        if(constants.roles.includes(data.roleName)){
            const result = await Role.findOneAndUpdate({_id: data.roleid}, data, {new: true})
            return result
        } else {
            return "Role is not allowed"
        }
        

         
                
    },

    

    removeRole: async (data) => {
        console.log("removeRole HelperFunction is called");

        const role = await Role.findById(data.id);
        if(role == null){
             var error = "Role does not exists."
             return error
        }
        role.lastModifiedBy = data.lastModifiedBy
        role.active = false
        role.save()
        return role;
        

    },

    findRoleById: async (query) => {
        console.log("findRoleById HelperFunction is called");
        
        const role = await Role.findOne(query.critarion)
        .populate('permissions', query.permissions)
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return role;
        

    },

    addSinglePermissionToRole: async (data) => {
        console.log("addSinglePermissionToRole HelperFunction is called");
       
        const role = await Role.findById(data.roleid)

        let existingpermissions = role.permissions
        let finalpermissions = [...new Set([...existingpermissions ,...data.newpermission])]
        role.permissions = finalpermissions
        
       /*  role.permissions.unshift(data.permissionid) */
        await role.save()
        return role
        

    },

    addPermissionsToRole: async (data) => {
        console.log("addPermissionsToRole HelperFunction is called");
       
        const role = await Role.findById(data.roleid)
        let existingpermissions = role.permissions
        let finalpermissions = [...new Set([...existingpermissions ,...data.newpermissions])]
        role.permissions = finalpermissions
        await role.save()
        return role
        

    },

    removePermissionFromRole: async (data) => {
        console.log("addSinglePermissionToRole HelperFunction is called");
       
        const role = await Role.findById(data.roleid)

        role.permissions.splice(role.permissions.indexOf(data.permissionid), 1)
       
        await role.save()
        return role
        

    }

    

};
