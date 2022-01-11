module.exports = (sequelize, dataTypes) => {
    let alias = 'product_rating';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            notNull: true
        },
        product_id: {
            type: dataTypes.INTEGER,
            notNull: true
            },
        user_email_rating: {
            type: dataTypes.STRING(100),
            notNull: true
        },
        rating: {
            type: dataTypes.INTEGER,
            notNull: true
        }

    };
    let config = {
        tableName: 'product_ratings',
        timestamps: false
    }
    
        
    const product_rating = sequelize.define(alias, cols, config);

    product_rating.associate = function(models){
        product.belongsTo(models.product, {
           as: "product",
           foreignKey: "product_id"
            });

    
        product.belongsTo(models.user, {
           as: "user",
           foreignKey: "user_email_rating"
            })
        };

    return product_rating;
};