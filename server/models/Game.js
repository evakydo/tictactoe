const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  board: {
    type: [String],
    default: Array(9).fill(null)
  },
  currentPlayer: {
    type: String,
    enum: ['player1', 'player2'],
    default: 'player1'
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'draw'],
    default: 'active'
  },
  winner: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Game', gameSchema); 
