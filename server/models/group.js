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
const Group = sequelize.define('Groups', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  groupName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: Sequelize.STRING
  },
  userId: {
    type: Sequelize.INTEGER,
    onDelete: 'CASCADE',
    references: {
      model: 'Users',
      key: 'id',
      as: 'userId'
    }
  }
}, {
  classMethods: {
    associate: (models) => {
        // associations can be defined here
      Group.hasMany(models.GroupMembers, {
        foreignKey: 'groupId',
        as: 'groupId'
      });
      Group.belongsTo(models.Users, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
    }
  }
});

export default Group;

