const jwt = require('jsonwebtoken');
const { jwt: {key}} = require('../../config');

const jwtGetUserData = (authorization) => {
    const token = authorization.split(' ')[1];
    const user = jwt.verify(token, key);
    return user;
}

const setRequestUser = (req, res, next) => {
    try { 
        const {
            authorization
        } = req.headers;
        if (!authorization){
            res.status(403).json({
            msg: 'Debe iniciar sesión para acceder a este recurso'
        })
        return;
    };
    const user = jwtGetUserData(authorization)
    req.user = user;
    next();
    } catch (error) {
        res.status(403).json({
            msg: 'Token inválido, inicie sesión nuevamente para acceder a este recurso'
        });
    };
};

const isAuthorized = (req, res, next) => {
    const {
        user
    } = req.user;
    if (!user.isAdmin) {
        res.status(403).json({
            msg: 'No está autorizado a acceder a este recurso'
        })
        return
    }
    next();
};

const setRequestUserForPublicApi = (req, res, next) => {
    const {
        authorization
    } = req. headers;
    if ( authorization ) {
        const user = jwtGetUserData(authorization)
        req.user = user;
    }
    next();
}

module.exports = {
    setRequestUser,
    isAuthorized,
    setRequestUserForPublicApi
}