const { getRentConfigurationService, createRentService, returnMovieService, createSellService, getSingleMovieService } = require('../services');
const { substractTwoDates } = require('../utils');

const rentMovies = async (req, res) => {
    const {
        movies
    } =  req.body;
    const rentConfiguration = await getRentConfigurationService();
    let dateToReturnMovie = new Date;
    dateToReturnMovie.setDate(dateToReturnMovie.getDate() + rentConfiguration.maxDaysToRent);
    const movieRent = {
        UserId: req.user.user.id,
        dateReturn: dateToReturnMovie, 
    };
    const rentData = await createRentService(movieRent, movies);
    if (rentData) {
        res.json({
            msg: 'Renta guardada exitosamente',
            rentData
        });
    } else {
        res.status(500).json({
            msg: 'Hubo un error al guardar sus datos'
        });
    }
};

const returnMovies = async (req, res) => {
    const { rentId } = req.body;
    const rentData = returnMovieService(rentId);
    if (rentData) {
        if (rentData.penalty) {
            res.json({
                msg: 'Retornó las películas muy tarde, se le aplicó multa',
                rentData
            });
        } else {
            res.json({
                msg: 'Su retorno ha sido grabado con éxito',
                rentData
            })
        }
    } else {
        res.status(404).json({
            msg: 'No se ha encontrado el recurso deseado'
        })
    }
};

const sellMovie = async (req, res) => {
    const {
        movies
    } =  req.body;
    const movieSale = {
        UserId: req.user.user.id,
        date: new Date,
    }
    await Promise.all(movies.map(async (movie, index) => {
        var movieData = await getSingleMovieService(movie.MovieId);
        movies[index].price = movieData.salePrice;
    }))
    const saleData = await createSellService(movieSale, movies);
    if (saleData) {
        res.json({
            msg: 'Renta guardada exitosamente',
            saleData
        });
    } else {
        res.status(500).json({
            msg: 'Hubo un error al guardar sus datos'
        });
    }
}


module.exports = {
    rentMovies,
    returnMovies,
    sellMovie
}