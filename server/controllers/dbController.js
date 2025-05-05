const express = require('express');
const mongoose = require('mongoose');
const gamesRouter = require('./routes/games');

const app = express();
app.use(express.json());

// Connect to MongoDB
const uri = 'mongodb://localhost:27017/gamedb';
mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Set up routes
app.use('/api/games', gamesRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));