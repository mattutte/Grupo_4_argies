module.exports = (sequelize, dataTypes) => {
    let alias = 'products';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            notNull: true
        },
        category: {
            type: dataTypes.STRING(200),
            notNull: true
        },
        name_product: {
            type: dataTypes.STRING(200),
            notNull: true
        },
        brand_id: {
            type: dataTypes.INTEGER,
            notNull: true
        },
        description_product: {
            type: dataTypes.STRING,
            notNull: true
        },
        year_created: {
            type: dataTypes.INTEGER,
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
            type: dataTypes.TEXT
        },
        regular_price: {
            type: dataTypes.FLOAT(2),
            notNull: true
        },
        special_price: {
            type: dataTypes.FLOAT(2),
        },
        rating_value: {
            type: dataTypes.FLOAT(2),
        },
        rating_num_comment: {
            type: dataTypes.INTEGER,
        },
        returnable: {
            type: dataTypes.BOOLEAN,
            notNull: true
        },
        weigh_package: {
            type: dataTypes.FLOAT(2),
            notNull: true
        },
        delivery_time: {
            type: dataTypes.STRING(200),
            notNull: true
        },
        color_available: {
            type: dataTypes.STRING(200),
            notNull: true
        },
        size_available: {
            type: dataTypes.STRING(200),
            notNull: true
        },
        image_main: {
            type: dataTypes.TEXT,
            notNull: true
        },
        image_front: {
            type: dataTypes.TEXT,
        },
        image_back: {
            type: dataTypes.TEXT,
        },
        }

    
    let config = {
        tableName: 'products',
        timestamps: false
    }


    const product = sequelize.define(alias, cols, config);

    product.associate = function(models){
        product.belongsTo(models.brand, {
           as: "brand",
           foreignKey: "brand_id"
            });
    
        product.hasMany(models.product_rating, {
           as: "product_ratings",
           foreignKey: "id"
            });
        
        product.belongsToMany(models.shopping_cart, {
            as: "shopping_carts",
            through: "shopping_cart_content",
            foreignKey: "id_product",
            otherKey: "shopping_cart",
            timestamps: false
             });

        };

    return product;
};