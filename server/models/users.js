/* eslint linebreak-style: ['error', 'windows']*/
import bcrypt from 'bcrypt';

module.exports = (sequelize, DataType) => {
  const Users = sequelize.define('Users', {
    userId: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataType.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      }
    },
    classMethods: {
      associate: (models) => {
        Users.hasMany(models.Groups, {
          foreignKey: 'userId'
        });
        Users.hasMany(models.GroupMembers, {
          foreignKey: 'userId',
          as: 'userId'
        });
        Users.hasMany(models.Messages, {
          foreignKey: 'userId',
          as: 'userId'
        });
      },
      isPassword: (encodedPassword, password) => bcrypt.compareSync(password, encodedPassword)
    }
  });
  return Users;
};
