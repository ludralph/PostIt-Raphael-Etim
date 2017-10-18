import Sequelize from 'sequelize';
import config from '../config/dbUrl.json';

const sequelize = new Sequelize(config.url);

const User = sequelize.define('User', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  classMethods: {
    associate: (models) => {
      // associations can be defined here
      User.hasMany(models.Groups, {
        foreignKey: 'userId',
        as: 'userId'
      });
      User.belongsTo(models.UsersGroup, {
        foreignKey: 'userId',
        as: 'userId'
      });
      User.hasMany(models.Message, {
        foreignKey: 'userId',
        as: 'userId'
      });
    }
  }
});

export default User;
