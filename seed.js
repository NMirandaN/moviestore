const sequelize = require('./src/db/config');
const { Rent_Configuration, User, Movie_Rent, Rent_Detail } = require('./src/db');
const bycrypt = require('bcrypt');
const saltRound = 5;
require('./src/db/connections');



sequelize.sync({ force: true})
    .then(async () => {
        const password = bycrypt.hashSync('Admin123', saltRound);
        console.log('Conexión establecida...')
        await Rent_Configuration.create()
        .then((rent) => {
            console.log('renta creada')
        })
        .catch(e => {
            console.log(e)
        })
        await User.create({
            name: 'Nelson',
            lastName: 'Miranda',
            username: 'admin',
            password: password,
            isAdmin: true
        });
    })

