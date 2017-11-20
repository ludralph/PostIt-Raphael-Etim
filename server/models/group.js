import Sequelize from 'sequelize';
import config from '../config/dbUrl.json';

const sequelize = new Sequelize(config.url);
const Group = sequelize.define('Group', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: 'Group name already exists. Use another name'
    }
  }
}, {
  classMethods: {
    associate: (models) => {
      Group.belongsToMany(models.User, {
        through: 'UserGroup',
        foreignKey: 'groupId',
        otherKey: 'userId',
        constraints: false,
      });
      Group.hasMany(models.Message, {
        foreignKey: 'groupId'
      });
    }
  }
});

export default Group;

