
/* eslint linebreak-style: ['error', 'windows']*/

'esversion: 6';

import Sequelize from 'sequelize';
import config from '../config/dbUrl.json';

const sequelize = new Sequelize(config.url);
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

