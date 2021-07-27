const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define("user", {
        userId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        passwordHash: DataTypes.STRING,
        password: DataTypes.VIRTUAL
    }, {
        hooks: {
            beforeSave: async user => {
                if (user.password) {
                    user.passwordHash = await bcrypt.hash(user.password,8);
                }
            }
        }
    });
    return user;
}