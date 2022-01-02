module.exports = (sequelize, dataTypes) => {
    let alias = 'brands';
    let cols = {

    };
    let config = {
        tableName = 'brands',
        timestamps: false
    }

    const brand = sequelize.define(alias, cols, config);

    return brand
}