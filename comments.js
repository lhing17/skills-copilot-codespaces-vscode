// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { randomBytes } = require('crypto');

// Create express server
const app = express();

// Allow cross-origin requests
app.use(cors());

// Parse request body
app.use(bodyParser.json());

// Create comments object
const commentsByPostId = {};

// Create route to get comments by post id
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// Create route to post comment
app.post('/posts/:id/comments', (req, res) => {
  // Create random id for comment
  const commentId = randomBytes(4).toString('hex');

  // Get content from request body
  const { content } = req.body;

  // Get comments from post id
  const comments = commentsByPostId[req.params.id] || [];

  // Push comment to comments array
  comments.push({ id: commentId, content });

  // Set post id to comments array
  commentsByPostId[req.params.id] = comments;

  // Send back comments
  res.status(201).send(comments);
});

// Listen on port 4001
app.listen(4001, () => {
  console.log('Listening on 4001');
});
