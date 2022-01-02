module.exports = (sequelize, dataTypes) => {
    let alias = 'users';
    let cols = {

    };
    let config = {
        tableName = 'users',
        timestamps: false
    }

    const user = sequelize.define(alias, cols, config);

    return user
}