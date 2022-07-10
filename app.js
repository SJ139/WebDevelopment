
// Sets up Express & body-parser & ejs and starts them
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var newTasks = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));

// Get Function - sets date/day and renders it on server//
app.get("/", function(req, res) {

      var today = new Date();

      var options = {
        weekday:"long",
        day: "numeric",
        month: "long"
      };
      var day = today.toLocaleDateString("en-US", options);

        res.render("list", {dayOfWeek: day, newListItem:newTasks});
      });

      // Post method - takes the input from newTask in list.ejs form and writes to console
      app.post("/", function(req,res){
        var newTask = req.body.newItem;
        newTasks.push(newTask);

        res.redirect("/");

      });

    app.listen(3000, function() {
      console.log("Server started on port 3000.");
    });
