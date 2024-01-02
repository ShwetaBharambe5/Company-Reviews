const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

router.post('/add-review', userController.addReview);
router.get('/get-review', userController.getReview);
router.get('/', userController.getReviewForm);

module.exports = router;