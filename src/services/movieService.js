const { Movie } = require('../db');

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

module.exports = {
    createMovieService,
    updateMovieService,
    getSingleMovieService
}