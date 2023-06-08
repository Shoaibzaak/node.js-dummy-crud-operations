/**
 * Created by Jamshaid
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamp');

const notificationSchema = new Schema({
  isRead: {
    type: Boolean,
    default: false  
  },
  userId: {
    type: String,
    ref: "users",
    required: true
  },
  attachedFileUrl: {
    type: String
},
  title: {
    type: String,
    default: ""
  },
  message: {
    type: String,
    default: ""
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  },
});

notificationSchema.plugin(timestamps);
const notificationModel = mongoose.model("Notification", notificationSchema);

module.exports = notificationModel;
