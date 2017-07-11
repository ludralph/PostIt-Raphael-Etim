/* eslint linebreak-style: ['error', 'windows']*/
module.exports = (sequelize, DataType) => {
  const Messages = sequelize.define('Messages', {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    message: {
      type: DataType.Text,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    priority: {
      type: DataType.ENUM,
      values: ['normal', 'urgent', 'critical']
    },
    userId: {
      type: DataType.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId'
      }
    },
    groupId: {
      type: DataType.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Groups',
        key: 'id',
        as: 'groupId'
      }
    },
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
  }
  );
};
