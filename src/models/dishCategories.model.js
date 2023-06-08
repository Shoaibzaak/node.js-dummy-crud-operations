
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.set('debug', true);

const dishCategoriesSchema = new Schema({
    dishCategoryName: {
        type: String
    },
    dishes: [{
        type: String
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


module.exports = mongoose.model('dishCategories', dishCategoriesSchema);
