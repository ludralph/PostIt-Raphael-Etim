/* eslint linebreak-style: ['error', 'windows']*/

module.exports = (sequelize, DataType) => {
  const Groups = sequelize.define('Groups', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataType.INTEGER
    },
    groupName: {
      type: DataType.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataType.STRING
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
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Groups.hasMany(models.GroupUsers, {
          foreignKey: 'groupId',
          as: 'groupId'
        });
        Groups.belongsTo(models.Users, {
          foreignKey: 'userId',
          onDelete: 'CASCADE',
        });
      }
    }
  });
  return Groups;
};
