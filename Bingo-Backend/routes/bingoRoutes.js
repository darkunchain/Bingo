const express = require('express');
const router = express.Router();
const { createCards, getCardByToken } = require('../controllers/bingoController');
const { authenticate } = require('../middlewares/authMiddleware');

router.post('/create', authenticate, createCards);
router.post('/claim', getCardByToken);

module.exports = router;
