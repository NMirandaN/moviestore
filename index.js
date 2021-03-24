const express = require('express');
const app = express();
const enviroment = require('./config');
const port = enviroment.app.port || 3000;

const { config } = require('./src/db');
require('./src/db/connections');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`server running on port ${port}`);
    config.sync({ force: false })
        .then(() => {
            console.log(`conexión exitosa`);
        })
        .catch(() => {
            console.log(`conexión fallida`);
        })
});