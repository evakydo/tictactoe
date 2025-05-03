const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.post('/gameState', gameController.handleGameState);

module.exports = router;