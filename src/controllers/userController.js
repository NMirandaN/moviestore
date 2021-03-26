const { createNewUserService, getUser } = require('../services');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRound = 5;
const config = require('../../config');

const signInWithJWT = (user) => {
    const token = jwt.sign({user}, config.jwt.key, {
        expiresIn: '24h'
    });
    return token;
}

const createRegularUser = async (req, res) => {
    const {
        name,
        lastName,
        username,
        password,
    } = req.body;
    const hashedPassword = bycrypt.hashSync(password, saltRound);
    const user = await createNewUserService({name, lastName, username, password: hashedPassword});
    if (user) {
        delete user.password;
        const token = signInWithJWT(user[0]);
        res.json({
            msg: 'Usuario creado con éxito',
            token: token
        })
    } else {
        res.json({
            msg: 'Surgió un error al crear su usuario',
        })
    }
    
};

const login = async (req, res) => {
    const {
        username,
        password
    } = req.body;
    const user = await getUser(username);
    if (user) {
        const matchPassword = bycrypt.compareSync(password, user.password);
        if (matchPassword) {
            delete user.dataValues.password;
            const token = signInWithJWT(user);
            res.json({
                msg: 'Login exitoso',
                token: token
            });
        } else {
            res.status(400).json({
                msg: 'Contraseña incorrecta'
            });
        }
    } else {
        res.status(404).json({
            msg: 'Usuario no existe'
        })
    };
};

module.exports = {
    createRegularUser,
    login
}