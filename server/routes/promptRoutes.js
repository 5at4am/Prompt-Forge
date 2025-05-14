const express = require('express');
const promptController = require('../controllers/promptController');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();

// Public routes
router.post('/enhance', promptController.enhancePrompt);
router.post('/save', promptController.savePrompt);
router.get('/public', promptController.getPublicPrompts);
router.get('/:id', promptController.getPrompt);

// Protected routes
router.get('/user/my-prompts', promptController.getUserPrompts);
router.put('/:id', promptController.updatePrompt);
router.delete('/:id', promptController.deletePrompt);
router.post('/:id/fork', promptController.forkPrompt);

module.exports = router;
