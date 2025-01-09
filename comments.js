// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var commentsPath = path.join(__dirname, 'comments.json');
var comments = [];

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

// Read comments from file
fs.readFile(commentsPath, function(err, data) {
  if (err) {
    console.error(err);
  } else {
    comments = JSON.parse(data);
  }
});

// Get comments
app.get('/comments', function(req, res) {
  res.send(comments);
});

// Add comment
app.post('/comments', function(req, res) {
  var comment = req.body;
  comments.push(comment);
  fs.writeFile(commentsPath, JSON.stringify(comments), function(err) {
    if (err) {
      console.error(err);
    } else {
      res.send(comments);
    }
  });
});

app.listen(3000, function() {
  console.log('Server is running on port 3000');
});