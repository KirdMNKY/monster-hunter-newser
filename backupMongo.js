// Dependencies
var express = require("express");
var mongojs = require("mongojs");
// Require request and cheerio. This makes the scraping possible
var request = require("request");
var cheerio = require("cheerio");

// Initialize Express
var app = express();

// Database configuration
var databaseUrl = "scraper";
var collections = ["scrapedData"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});

// Main route (simple Hello World Message)
app.get("/", function(req, res) {
  res.send("Hello world");
  // Dynamically create the HTML
  
});

// Retrieve data from the db
app.get("/all", function(req, res) {
  // Find all results from the scrapedData collection in the db
  db.scrapedData.find({}, function(error, found) {
    // Throw any errors to the console
    if (error) {
      console.log(error);
    }
    // If there are no errors, send the data to the browser as json
    else {
      res.json(found);
    }
  });
});
// var title = "";
// var link = "";
// var author = "";
// var authorLink = "";
// var synopsis = "";
// Scrape data from one site and place it into the mongodb db
app.get("/scrape", function(req, res) {
  // Make a request for the news section of `ycombinator`
  request("https://kotaku.com/tag/monster-hunter-world", function(error, response, html) {
    // Load the html body from request into cheerio
    var $ = cheerio.load(html);
// Scrape title
    // For each element with a "title" class
    $(".postlist__item").each(function(i, element) {
      // Save the text and href of each link enclosed in the current element
      // $(".headline")
      var title =  $(".headline").children("a").text();
      var link =  $(".headline").children("a").attr("href");
      console.log("title and link collected");
    
// Scrape Author
    // For each element with a "title" class
    // $(".meta_byline").each(function(i, element) {
    // Save the text and href of each link enclosed in the current element
    var author = $(".meta_byline").children("a").text();
    var authorLink = $(".meta_byline").children("a").attr("href");
    console.log("author and authorlink collected");
    
// Scrape Synopsis
    // For each element with a "title" class
  //  $(".excerpt").each(function(i, element) {
    // Save the text and href of each link enclosed in the current element
    var synopsis = $(".excerpt").children("p").text();
   console.log("synopsis collected");

    // If this found element had both a title and a link
    // if (title && link) {
      console.log("created db entries");
      // Insert the data in the scrapedData db
      db.scrapedData.insert({
        title: title,
        link: link,
        author: author,
        authorLink: authorLink,
        synopsis: synopsis
      },
      function(err, inserted) {
        if (err) {
          // Log the error if one is encountered during the query
          console.log(err);
        }
        else {
          // Otherwise, log the inserted data
          console.log(inserted);
        }
      });
    // }
  });

  });

  // Send a "Scrape Complete" message to the browser
  res.send("Scrape Complete");
});


// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});