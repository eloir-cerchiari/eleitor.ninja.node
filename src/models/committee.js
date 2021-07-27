module.exports = (sequelize, DataTypes) => {
    const committee = sequelize.define('committee', {

        committeeId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },


        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

    });

    committee.associate = (models) => {
        committee.hasMany(models.election, {
            foreignKey: {
                name: 'committeeId',
                allowNull: false
            },
            as: 'elections'
        });
    };

    return committee;
}


