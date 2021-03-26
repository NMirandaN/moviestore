const { createRegularUser, login } = require('./userController');
const { createMovie, updateMovie, getSingleMovieService, removeMovie, deleteMovie } = require('./movieController');

module.exports = {
    createRegularUser,
    login,
    createMovie,
    updateMovie,
    getSingleMovieService,
    removeMovie,
    deleteMovie
}