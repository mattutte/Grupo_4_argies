module.exports = (sequelize, dataTypes) => {
    let alias = 'leagues';
    let cols = {

    };
    let config = {
        tableName: 'leagues',
        timestamps: false
    }

    const league = sequelize.define(alias, cols, config);

    return league
}