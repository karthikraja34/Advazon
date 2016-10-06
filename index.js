var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose")

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");

app.use(express.static(__dirname + "/public"));

app.get("/",function(req,res){
    res.render("home");
});


app.listen(process.env.PORT,process.env.IP,function(){
    console.log("seerver is started");
});