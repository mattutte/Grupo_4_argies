module.exports = (sequelize, dataTypes) => {
    let alias = 'products';
    let cols = {

    };
    let config = {
        tableName: 'products',
        timestamps: false
    }

    const product = sequelize.define(alias, cols, config);

    return product
}