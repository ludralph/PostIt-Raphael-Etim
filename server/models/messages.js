/* eslint linebreak-style: ['error', 'windows']*/

'esversion: 6';

import Sequelize from 'sequelize';
import config from '../config/dbUrl.json';


const sequelize = new Sequelize(config.url);

const Messages = sequelize.define('Messages', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  message: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  priority: {
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
      Messages.belongsTo(models.Users, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
      Messages.belongsTo(models.Groups, {
        foreignKey: 'groupId',
        onDelete: 'CASCADE',
      });
    }
  }
});

export default Messages;

