module.exports = (sequelize, dataTypes) => {
    let alias = 'shopping_cart_content';
    let cols = {

    };
    let config = {
        tableName: 'shopping_cart_content',
        timestamps: false
    }

    const shopping_cart_content = sequelize.define(alias, cols, config);

    return shopping_cart_content
}