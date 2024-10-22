const express = require('express');
const router = express.Router();
const timeclockController = require('../controllers/timeclockController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/status', authMiddleware, timeclockController.getClockStatus);
router.post('/clock-in-out', authMiddleware, timeclockController.clockInOut);

module.exports = router;
