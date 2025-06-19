const express = require('express');
const router = express.Router();
const { createGame, startGame, drawBall } = require('../controllers/gameController');
const { authenticate } = require('../middlewares/authMiddleware');

router.post('/create', authenticate, createGame);
router.post('/:id/start', authenticate, startGame);
router.post('/:id/draw', authenticate, drawBall);

module.exports = router;
