const { createNewUserService, getUser } = require('./userService');
const { createMovieService, updateMovieService, getSingleMovieService, createMovieLogPricesService } = require('./movieService');

module.exports = {
    createNewUserService,
    getUser,
    createMovieService,
    updateMovieService,
    getSingleMovieService,
    createMovieLogPricesService
}