const express = require('express');
const router = express.Router();
const config = require('../../config');
const { createRegularUser, login } = require('../controllers');

router.post('/signup', createRegularUser);
router.post('/signin', login)

module.exports = router;