module.exports = (sequelize, dataTypes) => {
    let alias = 'teams';
    let cols = {

    };
    let config = {
        tableName: 'teams',
        timestamps: false
    }

    const team = sequelize.define(alias, cols, config);

    return team
}