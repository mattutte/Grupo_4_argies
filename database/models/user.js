module.exports = (sequelize, dataTypes) => {
    let alias = 'users';
    let cols = {

        email: {
            type: dataTypes.STRING(100),
            primaryKey: true,
            notNull: true
        },
        passwd: {
            type: dataTypes.STRING,
            notNull: true
        },
        fist_name: {
            type: dataTypes.STRING(200),
            notNull: true
        },
        last_name: {
            type: dataTypes.STRING(200),
            notNull: true
        },
        country: {
            type: dataTypes.STRING(200),
            notNull: true
        },
        face_pic: {
            type: dataTypes.STRING,
            notNull: true
        },
        category: {
            type: dataTypes.INTEGER,
            notNull: true
        },
        adult: {
            type: dataTypes.INTEGER
        }

    };
    let config = {
        tableName: 'users',
        timestamps: false
    }

    const user = sequelize.define(alias, cols, config);

    return user
}