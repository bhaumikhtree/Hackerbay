const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth');

// Handle POST requests to /auth
router.post('', authController.login);

module.exports = router;
