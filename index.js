var express     = require("express"),
    app         = express(),
    passport    = require("passport"),
    Service     = require("./models/bookings"),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose")


mongoose.connect("mongodb://localhost/adv");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));


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

app.get("/user",function(req,res){
    res.render("login");
});

app.get("/service/:ser",function(req, res) {
   res.render("service");
   console.log(req.params.ser);
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


app.listen(process.env.PORT,process.env.IP,function(){
    console.log("seerver is started");
});