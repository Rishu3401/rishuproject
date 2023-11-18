const express = require('express');
const insightController = require('../controllers/insightController');
const router = express.Router();
router.get('/', insightController.getInsights);
router.get('/:id', insightController.getInsightById);
module.exports = router;

