module.exports = (sequelize, dataTypes) => {
    let alias = 'shopping_cart';
    let cols = {

    };
    let config = {
        tableName: 'shopping_cart',
        timestamps: false
    }

    const shopping_cart = sequelize.define(alias, cols, config);

    return shopping_cart
}