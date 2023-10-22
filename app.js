// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.post("/", function(req, res){
   const getnavLink = req.body.navLink;
   res.render("main",{navLink:getnavLink});
    // res.redirect("/");
});

app.get("/", function(req, res) {
    res.render("main",{navLink:""});
});

app.post("/hwDesign", function(req, res){
    res.redirect("/hwDesign");
});

app.get("/hwDesign", function(req,res){
    res.render("hwDesign");
});

app.post("/hwRender", function(req, res){
    res.redirect("/hwRender");
});

app.get("/hwRender", function(req,res){
    res.render("hwRender");
});

app.post("/hobbies", function(req, res){
    res.redirect("/hobbies");
});

app.get("/hobbies", function(req,res){
    res.render("hobbies");
});


let port = process.env.PORT;
if(port == null || port == ""){
  port = 3000
}

app.listen(port, function() {
  console.log("Server has started successfully!");
});
