const express = require('express');
const router = express.Router();
const userRoute = require('./userRoute');
const movieRoute = require('./movieRoute');
const { setRequestUser } = require('../middleware');


router.use('/user', userRoute);
router.use('/movies', setRequestUser, movieRoute)

module.exports = router;