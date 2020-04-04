module.exports = function(sequelize, DataTypes){

    let User = sequelize.define("User", {

        access_token: {
            type: DataTypes.STRING,
            allowNull: false
        },
        refresh_token: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_name: {
            type: DataTypes.STRING,
            defaultValue: ""
        },
        img_url: {
            type: DataTypes.STRING,
            defaultValue: ""
        }
    });


    User.associate = function(models){

        User.hasMany(models.Review, {
            onDelete: "cascade"
        });
    };


    return User;
}