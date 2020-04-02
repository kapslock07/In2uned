
module.exports = function(sequelize, DataTypes){

    let Users = sequelize.define("Users", {

        user_name: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });


    Users.associate = function(models){

        Users.belongsTo(models.Review, {
            foreignKey: {
                allowNull: false
            }
        });
    }

    return Users;
}