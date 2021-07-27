module.exports = (sequelize, DataTypes) => {
    const election = sequelize.define('election', {

        electionId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }       
    },{});

    election.associate = (models) => {
        election.belongsTo(models.committee, {
          foreignKey: {
            name: 'committeeId',
            allowNull: false
          },
          as: 'elections'
        });
      };

    return election;
};