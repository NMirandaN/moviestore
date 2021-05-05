const { createMovieService, updateMovieService, getSingleMovieService, createMovieLogPricesService, createMovieLikeService } = require('../services');

const getMoviePayload = (body) => {
    return {
        title,
        description,
        stock,
        rentalPrice,
        salePrice,
        availability
    } = body;
}

const createMovieLogPrices = async (newMovie, oldMovie) => {
    const movieLog = {
        date: new Date(),
        rentalPrice: newMovie.rentalPrice,
        salePrice: newMovie.salePrice,
        MovieLogId: newMovie.id
    };
    if (!oldMovie) {
        await createMovieLogPricesService(movieLog);
    } else if (newMovie.salePrice !== oldMovie.salePrice || newMovie.rentalPrice !== oldMovie.rentalPrice) {
        await createMovieLogPricesService(movieLog)
    }
}

const createMovie = async (req, res) => {
    const file = req.file
    let pathToFile = (file) ? file.path : ''
    const payload = getMoviePayload(req.body);
    payload.image = pathToFile;
    payload.stock = parseInt(payload.stock);
    payload.rentalPrice = parseFloat(payload.rentalPrice);
    payload.salePrice = parseFloat(payload.salePrice);
    const movie = await createMovieService(payload);
    if (movie){
        await createMovieLogPrices(movie)
        res.json({
            msg: 'Su película ha sido creada exitosamente',
            movie
        });
    } else {
        res.status(500).json({
            msg: 'Surgió un error al crear su película'
        });
    }
};

const updateMovie = async (req, res) => {
    const file = req.file
    let pathToFile = (file) ? file.path : ''
    const {movieId} = req.params;
    const payload = getMoviePayload(req.body);
    const oldMovie = await getSingleMovieService(movieId);
    payload.image = pathToFile;
    let updatedMovie = await updateMovieService(movieId, payload);
    if (updatedMovie && updatedMovie[0] === 1) {
        updatedMovie = await getSingleMovieService(movieId);
        await createMovieLogPrices(updatedMovie, oldMovie);
        res.json({
            msg: 'su información ha sido actualizada con éxito',
            updatedMovie
        });
    } else {
        res.status(404).json({
            msg: 'No se ha modificado ninguna información',
        });
    }
};

const removeMovie = async (req, res) => {
    const { movieId } = req.params;
    const movie = await getSingleMovieService(movieId);
    if (movie) {
        const availability = !movie.availability;
        const updatedMovie = await updateMovieService(movieId, {availability});
        if (updatedMovie && updatedMovie[0] === 1) {
            res.json({
                msg: 'La disponibilidad de la película se ha cambiado con éxito'
            })
        } else {
            res.status(404).json({
                msg: 'No se ha modificado ninguna información',
            });
        }
    } else {
        res.status(404).json({
            msg: 'No se ha encontrado la película que desea modificar',
        });
    }
};

const deleteMovie = async (req, res) => {
    const { movieId } = req.params;
    const movie = await getSingleMovieService(movieId);
    if (movie) {
        movie.destroy();
        res.json({
            msg: 'La película se ha eliminado exitosamente'
        });
    } else {
        res.status(404).json({
            msg: 'No se ha encontrado la película deseada'
        });
    }
};

const likeMovie = async (req, res) => {
    const {movieId} = req.body;
    const userId = req.user.user.id;
    const likeMovie = await createMovieLikeService(movieId, userId);
    if (likeMovie) {
        res.json({
            msg: 'Su like ha sido agregado con éxito'
        });
    } else {
        res.status(404).json({
            msg: 'No se ha encontrado la película deseada'
        })
    }
}

module.exports = {
    createMovie,
    updateMovie,
    removeMovie,
    deleteMovie,
    likeMovie
}