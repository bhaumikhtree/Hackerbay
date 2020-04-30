const express = require('express');

const router = express.Router();

const serviceController = require('../controllers/service');
const verifyToken = require('../middleware/verifytoken');
// Handle POST requests to /jsonpatch
router.patch('/jsonpatch', verifyToken, serviceController.jsonpatch);
router.post('/thumbnail', verifyToken, serviceController.thumbnail);
module.exports = router;
