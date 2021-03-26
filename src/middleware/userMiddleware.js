const jwt = require('jsonwebtoken');
const { jwt: {key}} = require('../../config');

const setRequestUser = (req, res, next) => {
    const {
        authorization
    } = req.headers;
    if (!authorization){
        res.status(403).json({
            msg: 'Debe iniciar sesión para acceder a este recurso'
        })
    };
    const token = authorization.split(' ')[1];
    const user = jwt.verify(token, key);
    req.user = user;
    next();
};

const isAuthorized = (req, res, next) => {
    const {
        user
    } = req.user;
    if (!user.isAdmin) {
        res.status(403).json({
            msg: 'No está autorizado a acceder a este recurso'
        })
    }
    next();
};

module.exports = {
    setRequestUser,
    isAuthorized
}