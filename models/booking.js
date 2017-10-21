var mongoose = require("mongoose");

//DB Schema
var BookingSchema = new mongoose.Schema({
    name: String,
    phone: String,
    address: String,
    date: String,
    service: String
});

var Booking = mongoose.model("Booking", BookingSchema);

module.exports = mongoose.model("Booking", BookingSchema);