module.exports = (sequelize, dataTypes) => {
    let alias = 'installments_products';
    let cols = {

    };
    let config = {
        tableName: 'installments_products',
        timestamps: false
    }

    const installments_product = sequelize.define(alias, cols, config);

    return installments_product
}