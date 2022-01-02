module.exports = (sequelize, dataTypes) => {
    let alias = 'installments_schemes';
    let cols = {

    };
    let config = {
        tableName: 'installments_schemes',
        timestamps: false
    }

    const installments_scheme = sequelize.define(alias, cols, config);

    return installments_scheme
}