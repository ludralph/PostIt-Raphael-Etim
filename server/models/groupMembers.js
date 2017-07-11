/* eslint linebreak-style: ['error', 'windows']*/


module.exports = (sequelize, DataType) => {
  const GroupMembers = sequelize.define('GroupMembers', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataType.INTEGER
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
        GroupMembers.belongsTo(models.Users, {
          foreignKey: 'userId',
          onDelete: 'CASCADE'
        });
        GroupMembers.belongsTo(models.Groups, {
          foreignKey: 'groupId',
          onDelete: 'CASCADE'
        });
      }
    }
  }
  );
  return GroupMembers;
};
