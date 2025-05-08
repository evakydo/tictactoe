const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const Leaderboard = require('../models/Leaderboard');

router.post('/checkGameState', gameController.checkGameState);
router.post('/playerMove', gameController.playerMove);
router.post('/AIMove', gameController.AIMove);
router.get('/leaderboard', gameController.getLeaderboard)

