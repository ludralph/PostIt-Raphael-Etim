/* eslint linebreak-style: ['error', 'windows']*/

'esversion: 6';

import Sequelize from 'sequelize';
import config from '../config/dbUrl.json';

const sequelize = new Sequelize(config.url);
const Groups = sequelize.define('GroupMembers', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  admin: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  userId: {
    type: Sequelize.INTEGER,
    onDelete: 'CASCADE',
    references: {
      model: 'Users',
      key: 'id',
      as: 'userId'
    }
  },
  groupId: {
    type: Sequelize.INTEGER,
    onDelete: 'CASCADE',
    references: {
      model: 'Groups',
      key: 'id',
      as: 'groupId'
    }
  }
}, {
  classMethods: {
    associate: (models) => {
      // associations can be defined here
      Groups.belongsTo(models.Users, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });
      Groups.belongsTo(models.Groups, {
        foreignKey: 'groupId',
        onDelete: 'CASCADE'
      });
    }
  }
});

export default Groups;

