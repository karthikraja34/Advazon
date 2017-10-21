var express = require("express"),
    app = express(),
    passport = require("passport"),
    LocalStratergy = require("passport-local").Strategy,
    Service = require("./models/service"),
    Booking = require("./models/booking"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    User = require("./models/user"),
    flash = require('connect-flash'),
    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    methoodOverride = require('method-override'),
    session = require('express-session')


require('./config/passport')(passport);
mongoose.Promise = global.Promise;



// mongoose.connect("mongodb://localhost/adv");
mongoose.connect("mongodb://karthik:advazon@ds057066.mlab.com:57066/adv");
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser());
app.use(methoodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));





// =========================================================================
// passport session setup ==================================================
// =========================================================================
// required for persistent login sessions
// passport needs ability to serialize and unserialize users out of session
app.use(cookieParser());
app.use(session({
    secret: 'cookie_secret is this',
    name: 'cookie_name',
    proxy: true,
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});








app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // use connect-flash for flash messages stored in session



// Booking.create({
//     name: "name",
//     phone: "phone",
//     address: "address",
//     date: "date",
//     service: "service"
// }, function(err, service) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Booking created");
//     }
// });

app.get("/", function(req, res) {
    res.render("home", { username: req.user });
    console.log(req.user);


});


app.get("/service/:id", function(req, res) {
    var serv = req.params.id;

    Service.find({ service_name: serv }, function(err, allServices) {
        if (err) {
            console.log(err);
        } else {

            res.render("service", { services: allServices });

        }
    });

});

app.get("/about", function(req, res) {
    res.render("about");
});

app.get("/contact", function(req, res) {
    res.render("contact");
});

app.get("/works", function(req, res) {
    res.render("how-it-works");
});

app.get("/booking/:ser", isLoggedIn, function(req, res) {
    var ser_name = req.params.ser
    Service.find({ name: ser_name }, function(err, allServices) {
        if (err) {
            console.log(err);
        } else {
            service = allServices.name;
            res.render("booking", { service: req.params.ser });

        }

    });

});

app.post("/booking", isLoggedIn, function(req, res) {
    name = req.body.name;
    address = req.body.address;
    phone = req.body.phone;
    date = req.body.date;
    service = req.body.service_name;
    console.log(name, address, phone, date, service);
    var booking = new Booking({
        name: name,
        phone: phone,
        address: address,
        date: date,
        service: service
    });
    booking.save(function(err, booking) {
        if (err) return console.error(err);
        console.dir(booking);
    });
    console.log(Booking.find());
    res.render("home", { username: req.user });

});

// ==========
// AUTH ROUTES
// ==========
app.get("/login", function(req, res) {
    res.render("login", { message: req.flash('loginMessage') });
});

app.get("/register", function(req, res) {
    res.render("login", { message: req.flash('signupMessage') });
});

app.post('/register', passport.authenticate('local-signup', {
    successRedirect: '/', // redirect to the secure profile section
    failureRedirect: '/register', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));
app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/', // redirect to the secure profile section
    failureRedirect: '/register', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
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
app.get('/advazon/admin', function(req, res) {

    Booking.find({}, function(err, allBooking) {
        if (err) {
            console.log(err);
        } else {

            res.render("admin", { bookings: allBooking });

        }
    });

});
app.get("*", function(req, res) {
    res.send("404 page not found");
});
app.listen(process.env.PORT,process.env.IP, function() {
    console.log("seerver is started");
});