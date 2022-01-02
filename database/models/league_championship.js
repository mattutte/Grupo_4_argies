module.exports = (sequelize, dataTypes) => {
    let alias = 'league_championships';
    let cols = {

    };
    let config = {
        tableName = 'league_championships',
        timestamps: false
    }

    const league_championship = sequelize.define(alias, cols, config);

    return league_championship
}