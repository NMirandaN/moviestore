const express = require('express');
const router = express.Router();
const { setRequestUser, isAuthorized, imageUpload, setRequestUserForPublicApi } = require('../middleware');
const { createMovie, updateMovie, removeMovie, deleteMovie, likeMovie, getMovies, searchMovie } = require('../controllers');

router.post('/', setRequestUser, isAuthorized, imageUpload.single('image'), createMovie);
router.put('/:movieId', setRequestUser, isAuthorized, imageUpload.single('image'), updateMovie);
router.patch('/:movieId', setRequestUser, isAuthorized, removeMovie);
router.delete('/:movieId', setRequestUser, isAuthorized, deleteMovie);
router.post('/like', setRequestUser, likeMovie);
router.get('/', setRequestUserForPublicApi, getMovies);
router.get('/search', setRequestUserForPublicApi, searchMovie);

module.exports = router;