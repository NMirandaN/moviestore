const { createNewUserService, getUser } = require('./userService');
const { createMovieService, updateMovieService, getSingleMovieService, createMovieLogPricesService, createMovieLikeService, getMoviesService, getSearchedMovieService } = require('./movieService');
const { getRentConfigurationService, createRentService, getRentMovieService, returnMovieService, createSellService } = require('./movieMovementsService');

module.exports = {
    createNewUserService,
    getUser,
    createMovieService,
    updateMovieService,
    getSingleMovieService,
    createMovieLogPricesService,
    getRentConfigurationService,
    createRentService,
    getRentMovieService,
    returnMovieService,
    createSellService,
    createMovieLikeService,
    getMoviesService,
    getSearchedMovieService
}