module.exports = (sequelize, dataTypes) => {
    let alias = 'multimedia_produts';
    let cols = {

    };
    let config = {
        tableName: 'multimedia_produts',
        timestamps: false
    }

    const multimedia_produt = sequelize.define(alias, cols, config);

    return multimedia_produt
}