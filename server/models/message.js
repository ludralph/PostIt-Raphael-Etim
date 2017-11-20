import Sequelize from 'sequelize';
import config from '../config/dbUrl.json';


const sequelize = new Sequelize(config.url);

const Message = sequelize.define('Message', {
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  priority: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'Normal',
    validate: {
      isIn: {
        args: [
          ['Normal', 'Urgent', 'Critical']
        ],
        msg: 'Normal, Urgent or Critical Required'
      }
    }
  },
  groupId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  senderId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
}, {
  classMethods: {
    associate: (models) => {
      Message.belongsTo(models.Group, {
        foreignKey: 'groupId',
        onDelete: 'CASCADE',
      });
      Message.belongsTo(models.User, {
        foreignKey: 'senderId',
        onDelete: 'CASCADE',
      });
    },
  }
});
export default Message;

