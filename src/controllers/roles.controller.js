/**
 * Created by Jamshaid
 */


//import mongoose and models
var mongoose = require('mongoose')

var config = require('dotenv').config()
//var notificationCtrl = require("./notifications.controller")

//Lodash for data manipulation
const _ = require('lodash')

//bluebird for promises
const promise = require('bluebird')

//async for async tasks
var async = require('async')

const rolesHelper = require('../helpers/roles.helper')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createRole = async (req, res) => {
    console.log('createRole')
    try {
        var roleData = req.body
        
        roleData.addedby = req.token_decoded.d

        
            var result = await rolesHelper.createRole(roleData)
            var message = "Role created successfully"
            return responseHelper.success(res, result, message)
        

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getRolesWithFullDetails = async (req, res) => {
    console.log("getRolesWithFullDetails called")
    var roleData = req.body


    try {

        var result = await rolesHelper.getRolesWithFullDetails(roleData.sortproperty, roleData.sortorder, roleData.offset, roleData.limit, roleData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getRolesList = async (req, res) => {
    console.log("getRolesList called")
    var roleData = req.body


    try {

        var result = await rolesHelper.getRolesList(roleData.sortproperty, roleData.sortorder, roleData.offset, roleData.limit, roleData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateRole = async (req, res) => {
    console.log("request received for updateRole")

    var roleData = req.body
    var role = req.token_decoded.r
    try {
        roleData.lastModifiedBy = req.token_decoded.d
        
            var result = await rolesHelper.updateRole(roleData)

            if(result == "Role is not allowed"){
                responseHelper.requestfailure(res, result)
            } else {
                var message = 'Role Updated successfully'
                responseHelper.success(res, result, message)
            }
            
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeRole = async (req, res) => {
    console.log("removeRole called")
    try {
        var role = req.token_decoded.r

       
            var roleData = req.body
            roleData.lastModifiedBy = req.token_decoded.d
            var result = await rolesHelper.removeRole(roleData)

            var message = "Role removed successfully"

            if (result == "Role does not exists.") {
                message = "Role does not exists."
            }
            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findRoleById = async (req, res) => {
    console.log("findRoleById called")
    try {

       /* let permissions = [
            {
                _id: "630a48996e12e642dcc8438f",
                permissionName: "department-create",
                moduleName: "Departments"
            },
            {
                _id: "630a489f6e12e642dcc84390",
                permissionName: "department-update",
                moduleName: "Departments"
            },
            {
                _id: "630a489f6e12e642dcc84390",
                permissionName: "department-view",
                moduleName: "Departments"
            },
            {
                _id: "630a489f6e12e642dcc84390",
                permissionName: "department-delete",
                moduleName: "Departments"
            },
            {
                _id: "630a489f6e12e642dcc84390",
                permissionName: "quote-create",
                moduleName: "Quotes"
            },
            {
                _id: "630a489f6e12e642dcc84390",
                permissionName: "quote-update",
                moduleName: "Quotes"
            },
            {
                _id: "630a489f6e12e642dcc84390",
                permissionName: "quote-view",
                moduleName: "Quotes"
            }
            ,
            {
                _id: "630a489f6e12e642dcc84390",
                permissionName: "quote-delete",
                moduleName: "Quotes"
            }
        ]

        let example = {
            moduleName: "departments",
            permissions: [{
                permissionName: "create"
            }]
        }

        let modules = []
        permissions.map(permission => {
            if (!modules.includes(permission.moduleName))
                modules.push(permission.moduleName)
        })

        let singlePermission = []
        for (let module of modules) {
            let moduleBased = {
                moduleName: module,
                permissions: []
            }
            permissions.map(permission => {
                if (permission.moduleName == module) {
                    moduleBased.permissions.push(permission.permissionName)
                }
            })
            singlePermission.push(moduleBased)
        } */

        //console.log(permissions)
        /* console.log(singlePermission)
               
        

        let modulerPermissions = {
            permissionName : permission.permissionName
        } */
            var roleData = req.body

            var result = await rolesHelper.findRoleById(roleData)
            console.log(result)
            var message = "Role find successfully"
            if (result == null) {
                message = "Role does not exists."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var addSinglePermissionToRole = async (req, res) => {
    console.log("addSinglePermissionToRole called")
    try {
        
            var permissionData = req.body

            var result = await rolesHelper.addSinglePermissionToRole(permissionData)

            var message = "Permission added to Role successfully"
            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var addPermissionsToRole = async (req, res) => {
    console.log("addPermissionsToRole called")
    try {
        
            var permissionData = req.body

            var result = await rolesHelper.addPermissionsToRole(permissionData)

            var message = "Permissions added to Role successfully"
            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removePermissionsFromRole = async (req, res) => {
    console.log("addPermissionsToRole called")
    try {
        
            var permissionData = req.body

            var result = await rolesHelper.removePermissionFromRole(permissionData)

            var message = "Permission Removed from Role successfully"
            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createRole,
    getRolesWithFullDetails,
    getRolesList,
    updateRole,
    removeRole,
    findRoleById,
    addSinglePermissionToRole,
    addPermissionsToRole,
    removePermissionsFromRole

}



