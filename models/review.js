
module.exports = function(sequelize, DataTypes){
    let Review = sequelize.define("Review", {

        review_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        api_id: {
            type: DataTypes.STRING,
            allowNull: true
        },
        rating: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        review_text: {
            type: DataTypes.STRING,
            allowNull: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    });

    Review.associate = function(models) {
        Review.hasMany(models.User, {
            onDelete: "cascade"
        });
    };

    return Review;
}



