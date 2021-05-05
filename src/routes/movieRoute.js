const express = require('express');
const router = express.Router();
const { isAuthorized, imageUpload } = require('../middleware');
const { createMovie, updateMovie, removeMovie, deleteMovie, likeMovie, getMovies, searchMovie } = require('../controllers');

router.post('/', isAuthorized, imageUpload.single('image'), createMovie);
router.put('/:movieId', isAuthorized, imageUpload.single('image'), updateMovie);
router.patch('/:movieId', isAuthorized, removeMovie);
router.delete('/:movieId', isAuthorized, deleteMovie);
router.post('/like', likeMovie);
router.get('/', getMovies);
router.get('/search', searchMovie);

module.exports = router;