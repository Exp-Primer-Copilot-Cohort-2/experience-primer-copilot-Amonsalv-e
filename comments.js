// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

// Read comments.json file
const comments = JSON.parse(fs.readFileSync('comments.json'));

// Use body parser
app.use(bodyParser.json());

// Get all comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Get comment by ID
app.get('/comments/:id', (req, res) => {
  const id = req.params.id;
  const comment = comments.find(c => c.id === id);
  res.json(comment);
});

// Create a comment
app.post('/comments', (req, res) => {
  const comment = req.body;
  comments.push(comment);
  fs.writeFileSync('comments.json', JSON.stringify(comments));
  res.json(comment);
});

// Update a comment
app.put('/comments/:id', (req, res) => {
  const id = req.params.id;
  const comment = req.body;
  const index = comments.findIndex(c => c.id === id);
  comments[index] = comment;
  fs.writeFileSync('comments.json', JSON.stringify(comments));
  res.json(comment);
});

// Delete a comment
app.delete('/comments/:id', (req, res) => {
  const id = req.params.id;
  const index = comments.findIndex(c => c.id === id);
  comments.splice(index, 1);
  fs.writeFileSync('comments.json', JSON.stringify(comments));
  res.json({ id });
});

// Start server
app.listen(3000, () => {
  console.log('Server is running');
});