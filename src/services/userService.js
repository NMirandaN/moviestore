const { User } = require('../db');
const userFields = ['username', 'name', 'lastName', 'isAdmin'];

const createNewUserService = async (user) => {
    const createdUser = await User.create({
        username: user.username,
        name: user.name,
        lastName: user.lastName,
        password: user.password,
    }).catch(error => {
        console.log(error);
        return 0;
    })
    return createdUser;

};

const getUser = async (username) => {
    let user = await User.findOne({
            where: {
                username: username
            }
        })
        .catch(error => {
            console.log(error);
            return 0;
        })
        return user;
};

module.exports = {
    createNewUserService,
    getUser
};