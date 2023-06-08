

var mongoose = require('mongoose')
var Schema = mongoose.Schema

const constants = require("../hardCodedData").constants

mongoose.set('debug', true)

usersSchema = new Schema({
    _id: {
        type: String
    },
    modelId: {
        type: String
    },
    name: {
        type: String
    },
    version: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    password: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    ipAddress: {
        type: String
    },
    address: {
        type: String
    },
    active: {
        type: Boolean,
        default: true
    },
    platform: {
        type: String,
        enum: constants.platforms
    },
    role: {
        type: String,
        enum: constants.roles,
        default: constants.roles[0]
    },
    profile_picture_url: {
        type: String,
        default: '/uploads/dp/default.png'
    },
    deviceId: {
        type: String,
        default: ""
    },
    verification_code: {
        type: String,
        default: '',
    },
    is_verified: {
        type: Boolean,
        default: false,
    },
    approved: {
        type: Boolean,
        default: false,
    },
    blocked: {
        type: Boolean,
        default: false,
    },
    fcm_tokens: {
        token: {
            type: String
        },
        deviceType: {
            type: String,
            enum: ["android", "ios", "web"]
        }
    },
    location: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
        },
        coordinates: {
            type: [Number]
        }
    },
    userSettings: {
        type: String,
        ref: 'userSettings'
      }

},
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
    });


    
usersSchema.methods.setPassword = function (password) {
    this.password = crypto.createHash('sha1').update(password).digest("hex");
};

usersSchema.methods.validPassword = function (password) {
    var hash = crypto.createHash('sha1').update(password).digest("hex");
    return this.password === hash;
};

usersSchema.index({ "location": "2dsphere" });
usersSchema.on('index', function (err) {
    if (err) {
        console.error('User index error: %s', err);
    } else {
        console.info('User indexing complete');
    }
});




module.exports = mongoose.model('users', usersSchema);
