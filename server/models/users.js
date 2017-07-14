/* eslint linebreak-style: ['error', 'windows']*/

'esversion: 6';

import Sequelize from 'sequelize';
import config from '../config/dbUrl.json';

const sequelize = new Sequelize(config.url);

const Users = sequelize.define('Users', {
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
      Users.hasMany(models.Groups, {
        foreignKey: 'userId',
        as: 'userId'
      });
      Users.hasMany(models.GroupMembers, {
        foreignKey: 'userId',
        as: 'userId'
      });
      Users.hasMany(models.Messages, {
        foreignKey: 'userId',
        as: 'userId'
      });
    }
  }
});

export default Users;
