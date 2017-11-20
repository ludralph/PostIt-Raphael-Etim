import Sequelize from 'sequelize';
import config from '../config/dbUrl.json';

const sequelize = new Sequelize(config.url);
const UserGroup = sequelize.define('UserGroup', {
  userId: Sequelize.INTEGER,
  groupId: Sequelize.INTEGER
}, {
  classMethods: {
    // associate(models) {
    //   // associations can be defined here
    // }
  }
});
export default UserGroup;

