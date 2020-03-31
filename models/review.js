
module.exports = function(sequelize, DataTypes){
    let Review = sequelize.define("Reviews", {

        review_name: {
            type: DataTypes.STRING,
            notNull: true
        },
        api_id: {
            type: DataTypes.STRING,
            notNull: true
        },
        rating: {
            type: DataTypes.DOUBLE,
            notNull: true
        },
        review_text: {
            type: DataTypes.STRING,
            notNull: true
        },
        user_id: {
            type: DataTypes.INT,
            notNull: true
        }
    });

    Review.associate = function(models) {
        Review.hasMany(models.Users, {
            onDelete: "cascade"
        });
    };

    return Review;
}



