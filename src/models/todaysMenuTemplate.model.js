
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.set('debug', true);

const todaysMenuTemplateSchema = new Schema({
    menuTemplateName: {
        type: Date
    },
    menuDayName: {
        type: String
    },
    isTodaysMenu: {
        type: Boolean,
        default: true
    },
    isCurrentTemplate: {
        type: Boolean,
        default: true
    },
    availableDishes: [{
        dish: {
            dishId: {
                type: String
            },
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
            totalItems: {
                type: Number
            },
            availableItems: {
                type: Number
            }
        },
        dishCode: {
            type: String
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


module.exports = mongoose.model('todaysMenuTemplate', todaysMenuTemplateSchema);
