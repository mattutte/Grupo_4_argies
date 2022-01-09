module.exports = (sequelize, dataTypes) => {
    let alias = 'products';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            notNull: true
        },
        category: {
            type: dataTypes.STRING(200),
            notNull: true
        },
        name_product: {
            type: dataTypes.STRING,
            notNull: true
        },
        brand: {
            type: dataTypes.INTEGER,
            notNull: true
        },
        description_product: {
            type: dataTypes.STRING,
            notNull: true
        },
        year_created: {
            type: dataTypes.INTEGER
        },
        features_style: {
            type: dataTypes.STRING(200),
            notNull: true
        },
        features_gender: {
            type: dataTypes.STRING(200),
            notNull: true
        },
        features_use: {
            type: dataTypes.STRING(200),
            notNull: true
        },
        features_others: {
            type: dataTypes.STRING
        },
        regular_price: {
            type: dataTypes.INTEGER,
            notNull: true
        },
        special_price: {
            type: dataTypes.INTEGER,
        },
        rating_value: {
            type: dataTypes.INTEGER,
        },
        rating_num_comments: {
            type: dataTypes.INTEGER,
        },
        returnable: {
            type: dataTypes.INTEGER
        },
        weigh_package: {
            type: dataTypes.INTEGER,
            notNull: true
        },
        delivery_time: {
            type: dataTypes.STRING(200),
        },
        color_available: {
            type: dataTypes.STRING(200),
        },
        size_available: {
            type: dataTypes.STRING,
        },
        image_main: {
            type: dataTypes.STRING,
            notNull: true
        },
        image_front: {
            type: dataTypes.STRING,
        },
        image_back: {
            type: dataTypes.STRING
        }
    };
    let config = {
        tableName: 'products',
        timestamps: false
    }

    const product = sequelize.define(alias, cols, config);

    return product
}