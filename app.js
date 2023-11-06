// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var getnavLink = "";
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


// To Do List Database
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/todolistDB");
// mongoose.connect("mongodb+srv://weichuanlaw:G8226753R@cluster0.jmvsvgj.mongodb.net/todolistDB");
const itemsSchema = { name: String,
                      expireAt: {
                        type: Date,
                        default: Date.now, // The default expiration time
                        expires: 0, // Set the TTL index to 0 for dynamic expiration
                      }
                  };
// model is always capitalized, followed by SingularCollectionName,schemaName
const Item = mongoose.model("Item",itemsSchema);
const item1 = new Item({name:"Welcome to your todolist!",expireAt:null});
const item2 = new Item({name:"Hit the + button to add a new item.",expireAt:null});
const item3 = new Item({name:"<-- Hit this to delete an item.",expireAt:null});
const defaultItems = [item1,item2,item3];

async function findItems(){
  const Items_ = await Item.find({});
  return Items_;
}

async function findItemsByIdAndRemove(checkedItemId_input){
  const Items = await Item.findByIdAndRemove(checkedItemId_input);
  return Items;
}


app.get("/toDoList", function(req, res) {
  // find method is going to give an array back as the result which is 'foundItems'
  findItems().then(function(foundItems){
    if(foundItems.length ===0)
    {
      Item.insertMany(defaultItems)
      .then(function () {
        console.log("Successfully saved default items to database.");
      })
      .catch(function (err) {
        console.log(err);
      });
      res.redirect("/toDoList");
    }
    else {
      res.render("list", {listTitle: "Today", newListItems: foundItems});
    }
  });
});

app.post("/toDoList", function(req, res){
  const itemName = req.body.newItem;  // name of input in the form of list.ejs
  const item = new Item({name:itemName,expireAt: new Date(Date.now() + 5 * 60 * 1000)}); // 5 minutes
  item.save(); // A mongoose shortcut instead of using other insert methods
  res.redirect("/toDoList");
});

app.post("/delete", function(req, res){
  const checkedItemId = req.body.checkbox;
  findItemsByIdAndRemove(checkedItemId).then(function(){
    try
    {
      console.log("Successfully deleted selected item from database.");
      res.redirect("/toDoList");
    } catch (err)
    {
      console.log(err);
    }
  });
});
