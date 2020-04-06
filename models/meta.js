
module.exports = function(sequelize, DataTypes){
    let Meta = sequelize.define("Meta", {

        imgURL: {
            type: DataTypes.STRING,
            allowNull: false
        },
        track_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        track_artist: {
            type: DataTypes.STRING,
            allowNull: false
        },
        track_id: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Meta;
}