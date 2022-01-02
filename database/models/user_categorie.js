module.exports = (sequelize, dataTypes) => {
    let alias = 'user_categories';
    let cols = {

    };
    let config = {
        tableName = 'user_categories',
        timestamps: false
    }

    const user_categorie = sequelize.define(alias, cols, config);

    return user_categorie
}