module.exports = (sequelize, dataTypes) => {
    let alias = 'product_inventory';
    let cols = {

    };
    let config = {
        tableName: 'product_inventory',
        timestamps: false
    }

    const product_inventory = sequelize.define(alias, cols, config);

    return product_inventory
}