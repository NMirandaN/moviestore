const dotenv = require('dotenv');
let enviroment = process.env.NODE_ENV;

if (enviroment !== 'production') {
    const path = `${__dirname}/.env`;
    dotenv.config({ path });
}

const config = {
    app: {
        port: process.env.PORT
    },
    database: {
        type: process.env.DATABASE_TYPE,
        host: process.env.HOST,
        port: process.env.DB_PORT,
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        name: process.env.DB_NAME
    },
    jwt: {
        key: process.env.JWT_KEY
    }
}

module.exports = config