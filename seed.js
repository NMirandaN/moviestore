const sequelize = require('./src/db/config');
const { Rent_Configuration } = require('./src/db');

sequelize.sync({ force: false})
    .then(() => {
        console.log('Conexión establecida...')
    })
    .then(() => {
        Rent_Configuration.create()
            .then((rent) => {
                console.log('renta creada')
            })
            .catch(e => {
                console.log(e)
            })
    })

