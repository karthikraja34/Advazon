var mongoose = require("mongoose");

//DB Schema
var ServiceSchema = new mongoose.Schema({
  service_name : String, 
  name : String,
  image : String,
  description : String
});

var Service = mongoose.model("Service",ServiceSchema);

module.exports = mongoose.model("Service",ServiceSchema);