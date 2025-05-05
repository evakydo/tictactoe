const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
  gameID: Number,
  player1: String,
  player2: String,
  result: String,
  winner: String,
}, { collection: 'Leaderboard' });

module.exports = mongoose.model('Leaderboard', leaderboardSchema);
