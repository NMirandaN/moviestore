const models = require('./index');

models.Role.hasMany(models.User, { as: 'role', foreignKey: 'RoleId' });
models.User.belongsTo(models.Role, { as: 'user', foreignKey: 'RoleId' });

models.Movie.hasMany(models.Log_Movie_Price, { as: 'movie', foreignKey: 'MovieId' });
models.Log_Movie_Price.belongsTo(models.Movie, { as: 'log', foreignKey: 'MovieId' });
models.Movie.belongsToMany(models.User, { through: 'Like_Movie' });
models.User.belongsToMany(models.Movie, { through: 'Like_Movie' });

models.User.hasMany(models.Movie_Rent, { as: 'movie_rent', foreignKey: 'UserId' });
models.Movie_Rent.belongsTo(models.User, { as: 'user', foreignKey: 'UserId' });
models.Movie_Rent.hasMany(models.Rent_Detail, { as: 'rent_detail', foreignKey: 'RentId' });
models.Rent_Detail.belongsTo(models.Movie_Rent, { as: 'movie_rent', foreignKey: 'RentId' });
models.Movie.hasMany(models.Rent_Detail, { as: 'rent_detail', foreignKey: 'MovieId' });
models.Rent_Detail.belongsTo(models.Movie, { as: 'movie', foreignKey: 'MovieId' });

models.User.hasMany(models.Movie_Sale, { as: 'movie_sale', foreignKey: 'UserId' });
models.Movie_Sale.belongsTo(models.User, { as: 'user', foreignKey: 'UserId' });
models.Movie_Sale.hasMany(models.Sale_Detail, { as: 'sale_detail', foreignKey: 'SaleId' });
models.Sale_Detail.belongsTo(models.Movie_Sale, { as: 'movie_sale', foreignKey: 'SaleId' });
models.Movie.hasMany(models.Sale_Detail, { as: 'sale_detail', foreignKey: 'MovieId' });
models.Sale_Detail.belongsTo(models.Movie, { as: 'movie', foreignKey: 'MovieId' });
