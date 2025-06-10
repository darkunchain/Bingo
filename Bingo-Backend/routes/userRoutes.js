const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/userController');
const { authenticate, isAdmin } = require('../middlewares/authMiddleware');

// Rutas protegidas (requieren autenticación)
router.get('/', authenticate, isAdmin, getAllUsers);
router.get('/:id', authenticate, getUserById);
router.put('/:id', authenticate, updateUser);
router.delete('/:id', authenticate, isAdmin, deleteUser);

module.exports = router;