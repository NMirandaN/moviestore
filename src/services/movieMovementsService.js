const { Movie_Rent, Rent_Configuration, Movie, Rent_Detail, Sale_Detail, Movie_Sale } = require('../db');
const { getSingleMovieService } = require('./movieService');
const { substractTwoDates } = require('../utils');

const substractMovieStock = async (detail) => {
    detail.map(async e => {
        const movieId = parseInt(e.MovieId);
        const movie = await getSingleMovieService(movieId);
        movie.stock -= e.quantity;
        await movie.save();
    });
}

const getRentConfigurationService = async () => {
    const configuration = await Rent_Configuration.findOne({id: 1});
    return configuration;
};

const createRentService = async (rent, detail) => {
    const rentData = await Movie_Rent.create({
        dateReturn: rent.dateReturn,
        UserId: rent.UserId,
        rent_detail: detail
    }, {
        include: "rent_detail"
    })
    .catch(error => {
        console.log(error);
        return 0
    });
    if (rentData) {
        substractMovieStock(rentData.rent_detail);
    }
    return rentData;
};

const getRentMovieService = async (id) => {
    const rentData = await Movie_Rent.findOne({
        where: {
            id
        }
    }, {
        include: [{
            model: Rent_Detail
        }]
    })
    .catch(error => {
        console.log(error);
        return 0
    });
    return rentData
}

const getRentDetail = async (rentId) => {
    const rent_detail = await Rent_Detail.findAll({
        where: {
            RentId: rentId
        }
    })
        .catch(error => {
            console.log(error);
            return 0;
        })
    return rent_detail;
}

const returnMovieService = async (rentId) => {
    const rentConfiguration = await getRentConfigurationService();
    const rentData = await getRentMovieService(rentId);
    const rentDetail = await getRentDetail(rentId)
    const today = new Date;
    const dateToReturn = new Date(rentData.dateReturn);
    if (rentData) {
        rentDetail.map(e => {
            rentData.total += (e.quantity * e.price);
        });
        if (today > dateToReturn){
            const diffDays = substractTwoDates(dateToReturn, today);
            const penalty = rentConfiguration.dailyPenaltyRent * diffDays;
            rentData.penalty = penalty
            rentData.total += penalty;
        }
        rentDetail.map(async e => {
            const movie = await getSingleMovieService(e.MovieId)
            if (movie) {
                movie.stock += e.quantity;
                await movie.save()
            }
        })
        await rentData.save();
    }
    return rentData;
};

const createSellService = async (movieSale, movies) => {
    const saleData = await Movie_Sale.create({
        UserId: movieSale.UserId,
        date: movieSale.date,
        sale_detail: movies
    }, {
        include: 'sale_detail'
    })
    .catch(error => {
        console.log(error);
        return 0
    });
    if (saleData) {
        substractMovieStock(saleData.sale_detail);
        let totalSale = 0;
        saleData.sale_detail.map((detail) => {
            totalSale += detail.price
        })
        saleData.total = totalSale;
        await saleData.save()
    }
    return saleData;
}



module.exports = {
    getRentConfigurationService,
    createRentService,
    getRentMovieService,
    returnMovieService,
    createSellService
}