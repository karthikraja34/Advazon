var express        = require("express"),
    app            = express(),
    passport       = require("passport"),
    LocalStratergy  = require("passport-local").Strategy,
    Service        = require("./models/bookings"),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    User           = require("./models/user"),
    flash          = require('connect-flash'),
    morgan         = require('morgan'),
    cookieParser   = require('cookie-parser')

require('./config/passport')(passport);
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost/adv");
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));

//  Passport configuration
app.use(require("express-session")({
    secret : "advazon key for encription",
    resave :false,
    saveUninitialized :false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // use connect-flash for flash messages stored in session



// Service.create({
//     service_name : "AC service",
//     name : "Ac cleaning service",
//     image : "https://farm3.staticflickr.com/2701/5863039220_7ca55f1429.jpg",
//     description : "Awesome AC cleaning service"
// },function(err,service){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("Service created");
//     }
// });

app.get("/",function(req,res){
    res.render("home");
    
    
});


app.get("/service/:id",function(req, res) {
    var serv = req.params.id;
    Service.find({service_name : serv}, function(err,allServices){
        if(err){
            console.log(err);
        }
        else{
               res.render("service",{services:allServices});
             
        }
    });

});

app.get("/about",function(req,res){
    res.render("about");
});

app.get("/contact",function(req,res){
    res.render("contact");
});

app.get("/works",function(req,res){
    res.render("how-it-works");
});

app.get("/booking",isLoggedIn,function(req, res) {
    res.render("booking");
});

// ==========
// AUTH ROUTES
// ==========
app.get("/login",function(req,res){
    res.render("login",{ message: req.flash('loginMessage')});
});

app.get("/register",function(req,res){
    res.render("login",{ message: req.flash('signupMessage')});
});

app.post('/register', passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/register', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/register', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
        }));

 app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    // route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/register');
}
app.get("*",function(req, res) {
    res.send("404 page not found");
});
app.listen(process.env.PORT,process.env.IP,function(){
    console.log("seerver is started");
});