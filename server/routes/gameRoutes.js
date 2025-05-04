const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.post('/gameState', gameController.handleGameState);
router.post('/playerMove', gameController.playerMove);
router.post('/AIMove', gameController.AIMove);

module.exports = router;