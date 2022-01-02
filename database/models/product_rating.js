module.exports = (sequelize, dataTypes) => {
    let alias = 'product_ratings';
    let cols = {

    };
    let config = {
        tableName: 'product_ratings',
        timestamps: false
    }

    const product_rating = sequelize.define(alias, cols, config);

    return product_rating
}