module.exports = (sequelize, dataTypes) => {
    let alias = 'brands';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            notNull: true
        },
        name_brand: {
            type: dataTypes.STRING(200),
            notNull: true
        },
        country_origin: {
            type: dataTypes.STRING
        }
    };
    let config = {
        tableName: 'brands',
        timestamps: false
    }

    const brand = sequelize.define(alias, cols, config);

    return brand
}