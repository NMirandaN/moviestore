const { createRegularUser, login } = require('./userController');
const { createMovie, updateMovie, removeMovie, deleteMovie, likeMovie, getMovies, searchMovie } = require('./movieController');
const { rentMovies, returnMovies, sellMovie } = require('./movieMovementsController');

module.exports = {
    createRegularUser,
    login,
    createMovie,
    updateMovie,
    removeMovie,
    deleteMovie,
    rentMovies,
    returnMovies,
    sellMovie,
    likeMovie,
    getMovies,
    searchMovie
}