const { createNewUserService, getUser } = require('./userService');
const { createMovieService, updateMovieService, getSingleMovieService } = require('./movieService');

module.exports = {
    createNewUserService,
    getUser,
    createMovieService,
    updateMovieService,
    getSingleMovieService
}