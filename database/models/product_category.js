module.exports = (sequelize, dataTypes) => {
    let alias = 'product_category';
    let cols = {

    };
    let config = {
        tableName: 'product_category',
        timestamps: false
    }

    const product_category = sequelize.define(alias, cols, config);

    return product_category
}