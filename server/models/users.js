/* eslint linebreak-style: ['error', 'windows']*/

import Sequelize from 'sequelize';


const sequelize = new Sequelize('mockpostit', 'postgres', 'bootcamp', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

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
