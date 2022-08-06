
// Sets up Express & body-parser & ejs and starts them
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var newTasks = [];
let workItems=[];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

// Get Function - sets date/day and renders it on server//
app.get("/", function(req, res) {

      var today = new Date();

      var options = {
        weekday:"long",
        day: "numeric",
        month: "long"
      };
      var day = today.toLocaleDateString("en-US", options);

        res.render("list", {listTitle: day, newListItem:newTasks});
      });

      // Post method - takes the input from newTask in list.ejs form and writes to console
      // the if statement is supposed to create seperat post to 2 lists

      app.post("/", function(req,res){
        let newTask = req.body.newItem;

        if(req.body.list == "work"){
          workItems.push(newTask);
          res.redirect("/work");
        }else{
          newTasks.push(newTask);
          res.redirect("/");
        }

      });

      app.get("/work", function(req,res){
        res.render("list",{listTitle:"Work List", newListItem:workItems});
      });

      app.post("/work", function(req,res){
        let item = req.body.newItem;
        workItems.push(item);
        res.redirect("/work");
      });

      app.get("/about", function(req,res){
        res.render("about", {listTitle:"About"});
      })

    app.listen(3000, function() {
      console.log("Server started on port 3000.");
    });
