const { Movie, Log_Movie_Price, Like_Movie } = require('../db');
const {Sequelize} = require('sequelize');
const Op = Sequelize.Op;

const quantityResultsByPage = 2;

const createMovieService = async (movie) => {
    const availability = (movie.availability !== false) ? true : false
    const createdMovie = await Movie.create({
        title: movie.title,
        description: movie.description,
        stock: movie.stock,
        rentalPrice: movie.rentalPrice,
        salePrice: movie.salePrice,
        availability: availability,
        image: movie.image
    })
    .catch(error => {
        console.log(error);
        return 0;
    })
    return createdMovie;
};

const updateMovieService = async (id, movie) => {
    const updatedMovie = await Movie.update(
        movie,
        {
            where: {
                id
            }
        }
    )
    .catch(error => {
        console.log(error);
        return false;
    });
    return updatedMovie;
};

const getSingleMovieService = async (id) => {
    const movie = await Movie.findOne({
        where: {
            id
        }
    })
    .catch(error => {
        console.log(error);
        return 0
    });
    return movie;
};

const createMovieLogPricesService = async (log) => {
    const newLog = await Log_Movie_Price.create(log)
        .catch(error => {
            console.log(error);
            return 0
        });
    return newLog
};

const createMovieLikeService = async (movieId, userId) => {
    const movie = await getSingleMovieService(movieId);
    const movieLike = await Like_Movie.create({
        MovieId: movieId,
        UserId: userId
    })
    .catch(error => {
        console.log(error);
        return 0
    });
    movie.ranking += 1;
    movie.save();
    return movieLike;
};

const getMoviesService = async (userIsAdmin, availability, sortByTitle, sortByPopularity, page) => {
    let movies;
    if (userIsAdmin && availability !== undefined) {
        movies = await Movie.findAll({
            limit: quantityResultsByPage,
            offset: parseInt(page),
            where: {
                availability: availability
            },
            order: [
                ['title', sortByTitle],
                ['ranking', sortByPopularity]
            ]
        })
        .catch(error => {
            console.log(error);
            return 0
        });
    } else if (userIsAdmin) {
        movies = await Movie.findAll({
            limit: quantityResultsByPage,
            offset: parseInt(page),
            order: [
                ['title', sortByTitle],
                ['ranking', sortByPopularity]
            ]
        })
        .catch(error => {
            console.log(error);
            return 0
        });
    } else {
        movies = await Movie.findAll({
            limit: quantityResultsByPage,
            offset: parseInt(page),
            where: {
                availability: true
            },
            order: [
                ['title', sortByTitle],
                ['ranking', sortByPopularity]
            ]
        })
        .catch(error => {
            console.log(error);
            return 0
        });
    }
    return movies;
};

const getSearchedMovieService = async (searchedName) => {
    const movies = await Movie.findAll({
        where: {
            title: {
                [Op.like]: `%${searchedName}%`
            }
        }
    })
    .catch(error => {
        console.log(error);
        return 0
    })
    return movies;
};

module.exports = {
    createMovieService,
    updateMovieService,
    getSingleMovieService,
    createMovieLogPricesService,
    createMovieLikeService,
    getMoviesService,
    getSearchedMovieService,
}