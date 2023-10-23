// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const getnavLink = "";
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.post("/", function(req, res){
   getnavLink = req.body.navLink;
   res.redirect("/");
   // res.render("main",{navLink:getnavLink});
});

app.get("/", function(req, res) {
    res.render("main",{navLink:getnavLink});
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

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log("Server has started successfully!");
});
