
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.set('debug', true);

const hotelsSchema = new Schema({
    hotelName: {
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
},
{
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    usePushEach: true
})


module.exports = mongoose.model('hotels', hotelsSchema);
