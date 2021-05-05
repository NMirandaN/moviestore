const express = require('express');
const router = express.Router();
const userRoute = require('./userRoute');
const movieRoute = require('./movieRoute');
const rentMovieRoute = require('./movieMovementsRoute');
const { setRequestUser } = require('../middleware');


router.use('/user', userRoute);
router.use('/movies', setRequestUser, movieRoute);
router.use('/movies', setRequestUser, rentMovieRoute);

module.exports = router;