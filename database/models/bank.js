module.exports = (sequelize, dataTypes) => {
    let alias = 'banks';
    let cols = {

    };
    let config = {
        tableName = 'banks',
        timestamps: false
    }

    const bank = sequelize.define(alias, cols, config);

    return bank
}