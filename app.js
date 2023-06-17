const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.post("/", function(req, res){
    res.redirect("/");
});

app.get("/", function(req, res) {
    res.render("main");
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
