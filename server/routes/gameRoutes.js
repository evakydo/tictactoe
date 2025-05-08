const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const Game = require('../models/Game');

router.post('/game', async (req, res) => {
  try {
    const newGame = new Game({
      board: Array(9).fill(null),
      currentPlayer: 'player1',
      status: 'active'
    });

    const savedGame = await newGame.save();
    res.status(201).json({ gameId: savedGame._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/game/:gameId', gameController.getGameById);
router.post('/checkGameState', gameController.checkGameState);
router.post('/playerMove', gameController.playerMove);
router.post('/AIMove', gameController.AIMove);
router.get('/leaderboard', gameController.getLeaderboard)

