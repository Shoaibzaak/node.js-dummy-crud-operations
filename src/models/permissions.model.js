
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamp')

mongoose.set('debug', true);

permissionSchema = new Schema({
    permissionName: {
        type: String
    },
    moduleName: {
        type: String
    },
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

permissionSchema.plugin(timestamps)
module.exports = mongoose.model('permissions', permissionSchema);
