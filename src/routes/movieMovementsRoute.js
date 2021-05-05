const express = require('express');
const router = express.Router();
const { rentMovies, returnMovies, sellMovie } = require('../controllers');

router.post('/rent', rentMovies);
router.patch('/rent', returnMovies);
router.post('/sale', sellMovie);

module.exports = router
