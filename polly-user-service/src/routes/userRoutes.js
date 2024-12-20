const express = require('express');
const { registerUser, loginUser, getUser, updateUser, deleteUser } = require('../controllers/userController');
const authenticate = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id', authenticate, getUser);
router.put('/:id', authenticate, updateUser);
router.delete('/:id', authenticate, deleteUser);

module.exports = router;