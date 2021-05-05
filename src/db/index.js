const config = require('./config');
const { User } = require('./models/users');
const { Movie, Log_Movie_Price, Like_Movie } = require('./models/movies');
const { Movie_Rent, Rent_Configuration, Rent_Detail, Movie_Sale, Sale_Detail, Movement_Log } = require('./models/movieMovements');

module.exports = {
    config,
    User,
    Movie,
    Log_Movie_Price,
    Movie_Rent,
    Rent_Configuration,
    Rent_Detail,
    Movie_Sale,
    Sale_Detail,
    Movement_Log,
    Like_Movie
};