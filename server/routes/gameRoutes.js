const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const Leaderboard = require('../models/Leaderboard');


router.post('/gameState', gameController.handleGameState);
router.post('/playerMove', gameController.playerMove);
router.post('/AIMove', gameController.AIMove);
router.get('/leaderboard', async (req, res) => {
    try {
      const games = await Leaderboard.find();
      res.json(games);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
module.exports = router;