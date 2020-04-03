
module.exports = function(sequelize, DataTypes){

    let User = sequelize.define("User", {

        user_name: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });


    User.associate = function(models){

        User.hasMany(models.Review, {
            onDelete: "cascade"
        });
    };


    return User;
}