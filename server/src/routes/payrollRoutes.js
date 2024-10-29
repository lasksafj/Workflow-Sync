const express = require('express');
const router = express.Router();
const payrollController = require('../controllers/payrollController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/earning-get', authMiddleware, payrollController.getEarnings);

module.exports = router;
