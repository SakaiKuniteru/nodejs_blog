const express = require('express');
const router = express.Router();

const coursesController = require('../app/controllers/CourseController');

// newsController.index
router.get('/create', coursesController.create);
router.post('/store', coursesController.store);
router.get('/:id/edit', coursesController.edit);
router.post('/handle-form-actions', coursesController.handleFormActions);
router.put('/:id', coursesController.update);
router.delete('/:id', coursesController.delete);
router.get('/:slug', coursesController.show);

module.exports = router;
