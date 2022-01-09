module.exports = (sequelize, dataTypes) => {
    let alias = 'product_ratings';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            notNull: true
        },
        product_id: {
            type: dataTypes.INTEGER,
            notNull: true
        },
        user_email_rating: {
            type: dataTypes.STRING(200),
            notNull: true
        },
        rating: {
            type: dataTypes.INTEGER,
            notNull: true
        }
    };
    let config = {
        tableName: 'product_ratings',
        timestamps: false
    }

    const product_rating = sequelize.define(alias, cols, config);

    return product_rating
}