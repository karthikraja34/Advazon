var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var bcrypt   = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
 local            : {
        name         : String,
        email        : String,
        password     : String,
        phone        : String
        
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String,
        phone        : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String,
        phone        : String
    }});
// methods ======================
// generating a hash
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};
module.exports = mongoose.model("User",UserSchema);