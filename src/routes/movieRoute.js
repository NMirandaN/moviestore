const express = require('express');
const router = express.Router();
const { isAuthorized, imageUpload } = require('../middleware');
const { createMovie, updateMovie, removeMovie, deleteMovie } = require('../controllers');

router.post('/', isAuthorized, imageUpload.single('image'), createMovie);
router.put('/:movieId', isAuthorized, imageUpload.single('image'), updateMovie);
router.patch('/:movieId', isAuthorized, removeMovie);
router.delete('/:movieId', isAuthorized, deleteMovie);

module.exports = router;