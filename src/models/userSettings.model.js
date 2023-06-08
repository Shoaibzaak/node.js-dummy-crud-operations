
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.set('debug', true);

userSettingsSchema = new Schema({
    user: {
        type: String,
        ref: 'users'
    },
    notificationSettings: {
        showActive: {
            type: Boolean,
            default: true
        },
        pauseNotification: {
            type: Boolean,
            default: false
        },
        pauseDuration: {
            type: String
        },
        durationUnit: {
            type: String,
            default: "minutes",
            enum: ["minutes"]
        }
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
},
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
        usePushEach: true
    })


module.exports = mongoose.model('userSettings', userSettingsSchema);
