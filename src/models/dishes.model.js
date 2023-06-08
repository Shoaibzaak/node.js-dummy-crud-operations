
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.set('debug', true);

const dishesSchema = new Schema({
    dishCode: {
        type: String
    },
    dishName: {
        type: String
    },
    dishPrice: {
        type: String
    },
    dishSize: {
        type: String
    },
    dishIngrediants: [{
        type: String
    }],
    dishParts: [{
        type: String
    }],
    freeIncludes: [{
        freeItemName: {
            type: String
        },
        freeItemPrice: {
            type: String
        }
    }],
    dishCategory: {
        type: String,
        ref: 'dishCategories'
    },
    dishPreparationDate: {
        type: Date
    },
    dishExpiryDate: {
        type: Date
    },
    extraCharges: [{
        extraChargesFor: {
            type: String
        },
        extraChargePrice: {
            type: String
        },
        optionSelected: {
            type: Boolean,
            default: false
        }
    }],
    branch: {
        type: String,
        ref: 'restBranches'
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


module.exports = mongoose.model('dishes', dishesSchema);
