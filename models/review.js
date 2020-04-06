
module.exports = function(sequelize, DataTypes){
    let Review = sequelize.define("Review", {

        imgURL: {
            type: DataTypes.STRING,
            allowNull: true
        },
        track_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        track_artist: {
            type: DataTypes.STRING,
            allowNull: true
        },
        track_id: {
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
        }
    });

    Review.associate = function(models) {
        Review.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Review;
}



