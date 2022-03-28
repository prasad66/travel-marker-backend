const bcrypt = require('bcrypt');

const salt = bcrypt.genSaltSync(10);

const hashPassword = async (password) => {
    password = password.toString();
    return await bcrypt.hashSync(password, salt);
}

const comparePassword = async (password, hash) => {
    return await bcrypt.compareSync(password, hash);
}

module.exports = { hashPassword, comparePassword };