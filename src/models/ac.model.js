const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var timestamps = require("mongoose-timestamp");

const hardCodedData = require("../hardCodedData");

/* 
This schema and its controller helps us to stop the server from working
If the of as is true then the server will allow the user to call the apis
 */
const ACSchema = new Schema(
  {
    as: {
      type: Boolean,
      default: true
    }
  }
);

ACSchema.plugin(timestamps);

const ACModel = mongoose.model("AC", ACSchema);

module.exports = ACModel;
