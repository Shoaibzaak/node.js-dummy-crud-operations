
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamp')

const constants = require("../hardCodedData").constants

mongoose.set('debug', true);

rolesSchema = new Schema({
    roleName: {
        type: String,
        enum: constants.roles,
    },
    permissions: [{
        type: String,
        ref: 'permissions'
    }],
    /* frontEndModules: [{
        type: String,
        ref: 'frontEndModules'
    }], */
    addedby: {
        type: String,
        ref: 'users'
    },
    
    lastModifiedBy: {
        type: String,
        ref: 'users'
    },
    active: {
        type: Boolean,
        default: true
    }
})

rolesSchema.plugin(timestamps)
module.exports = mongoose.model('roles', rolesSchema);
