module.exports = (sequelize, dataTypes) => {
    let alias = 'shopping_cart';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            notNull: true
        },
        email_user: {
            type: dataTypes.STRING(100),
            notNull: true
        },
        q_products: {
            type: dataTypes.INTEGER,
            notNull: true
        },
        total_price: {
            type: dataTypes.INTEGER,
            notNull: true
        }
    };
    let config = {
        tableName: 'shopping_cart',
        timestamps: false
    }

    const shopping_cart = sequelize.define(alias, cols, config);

    return shopping_cart
}