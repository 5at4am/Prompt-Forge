const express = require('express');
const interactionController = require('../controllers/interactionController');
const router = express.Router();

// Comments
router.post('/comments', interactionController.addComment);
router.get('/comments/:prompt_id', interactionController.getComments);

// Likes
router.post('/likes/:prompt_id', interactionController.likePrompt);
router.delete('/likes/:prompt_id', interactionController.unlikePrompt);
router.get('/likes/:prompt_id/check', interactionController.checkLike);
router.get('/likes/:prompt_id/count', interactionController.getLikeCount);

module.exports = router;
