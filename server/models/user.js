import Sequelize from 'sequelize';
import bcrypt from 'bcrypt';
import config from '../config/dbUrl.json';

const sequelize = new Sequelize(config.url);
const User = sequelize.define('User', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: 'This email already exists'
    },
    validate: {
      isEmail: {
        args: true,
        msg: 'This email address is invalid'
      }
    }
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: 'This username already exists'
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  resetPasswordToken: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  resetPasswordExpires: {
    type: Sequelize.DATE,
    allowNull: true,
  },
}, {
  classMethods: {
    associate: (models) => {
      User.belongsToMany(models.Group, {
        through: 'UserGroup',
        foreignKey: 'userId',
        otherKey: 'groupId',
        constraints: false,
      });
      User.hasMany(models.Message, {
        foreignKey: 'senderId',
        as: 'messages',
      });
    }
  },
  instanceMethods: {
    hashPassword() {
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
    }
  },
  hooks: {
    beforeCreate(user) {
      user.hashPassword();
    },
    beforeUpdate(user) {
      if (user.changed('password')) {
        user.hashPassword();
      }
    }
  }
});

export default User;
