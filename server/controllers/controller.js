
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import Group from '../models/group';
import UsersGroup from '../models/usersgroup';
import Message from '../models/message';
import env from 'dotenv';

env.config();

/**
 * @class ApiController
 */
export default class ApiController {
  /**
 * Users details are captured by this method on signup and persisted in the database
 * @param {obj} req
 * @param {obj} res
 * @param {obj} next
 * @return {JSON} Returns success or failure message with the data
 *
 */
  static signup(req, res) {
    const name = req.body.name,
      username = req.body.username.toLowerCase(),
      email = req.body.email,
      password = req.body.password;
    return User.sync({ force: false }).then(() => {
      const saltRounds = 10;
      bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          User.create({
            name, username, email, password: hash
          }).then((user) => {
            const payload = { username: user.username,
              userId: user.id,
              email: user.email,
              name: user.name
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
              expiresIn: 60 * 60 * 24
            });
            res.status(200).json({
              status: 'success',
              data: {
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email
              },
              message: 'Account created',
              token
            });
          }).catch((err) => {
            if (err) {
              res.json({ message: 'Record exists already' });
            }
          });
        });
      });
    });
  }

  /**
 *
 * @param {obj} req
 * @param {obj} res
 * @param {obj} next
 * @return {obj} Return success or failure message
 */
  static signin(req, res) {
    const email = req.body.email,
      password = req.body.password;
    User.findOne({ where: { email } }).then((user) => {
      if (user && user.dataValues.email === email) {
        const check = bcrypt.compareSync(password, user.dataValues.password);
        const payload = { email: user.dataValues.email };
        if (check) {
          const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 60 * 60 * 24
          });
          res.status(200).json({
            status: 'Success',
            data: {
              id: user.id,
              name: user.name,
              email: user.email,
              username: user.username
            },
            message: 'Logged In',
            token
          });
        } else {
          res.status(401).json({ message: 'Invalid Password' });
        }
      } else {
        res.json({ message: 'User not found' });
      }
    });
  }

/**
 * @return {json} Returns request object containing message of if request is granted or denied
 * @param {obj} req
 * @param {obj} res
 * @param {obj} next
 */
  static ensureToken(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization;
    // decode token
    if (token) {
    // verifies secret and checks exp
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });
        }
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      });
    } else {
      return res.status(403).send({
        success: false,
        message: 'Access denied. Either'
      });
    }
  }


  /**
 * This method is used for creating groups
 * @param {obj} req
 * @param {obj} res
 * @param {obj} next
 * @return {obj} Returns success or failure message with data
 */
  static createGroup(req, res) {
    return Group.sync({ force: false }).then(() => {
      Group.create(req.body).then((group) => {
        res.status(201).json({
          status: 'success',
          data: group,
          message: 'Group Created'
        });
      }).catch((err) => {
        if (err) {
          res.status(409).json({ message: 'Invalid input. groupName exists already or userId does not exist' });
        }
      });
    });
  }

  /**
   * This method maps users to groups they belong to
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @return {obj} Returns a success message with data or failure message
   */
  static addUser(req, res) {
    const groupId = req.params.groupId,
      username = req.body.username;
    User.findOne({ where: { username } }).then((user) => {
      if (!user) {
        res.json({ message: 'Username does not exits' });
      } else {
        return UsersGroup.sync({ force: false }).then(() => {
          UsersGroup.findOrCreate({ where: { userId: user.id, groupId } })
          .spread((userGroup, created) => {
            if (created) {
              res.status(200).json({
                message: 'User successfully added' });
            } else {
              res.status(409).json({ status: 'failed',
                message: 'User already exist in this group' });
            }
          });
        });
      }
    }
    );
  }

  /**
   * @return {array} Returns array of objects
   * @param {obj} req
   * @param {obj} res
   */
  static getUsersInGroup(req, res) {
    const groupId = req.params.groupId;
    const isGroupId = Number.isInteger(parseInt(groupId, 10));
    if (isGroupId) {
      UsersGroup.findAll({
        attributes: ['userId'], where: { groupId }
      }).then((users) => {
        if (users) {
          const allUsers = [];
          users.forEach((user) => {
            allUsers.push(user.userId);
          });
          User.findAll({
            attributes: ['username'],
            where: {
              id: allUsers
            }
          }).then((allUser) => {
            res.status(200).json({ allUser });
          });
        }
      });
    }
  }

/**
 * @return {obj} Returns object containing pageCount and arrays of users
 * @param {*} req
 * @param {*} res
 */
  static getUsers(req, res) {
    const search = req.query.search;
    const offset = req.query.offset;
    if (search) {
      User.findAndCountAll({
        where: {
          username: {
            $like: `%${search}%`
          }
        },
        offset,
        limit: 5
      })
.then((result) => {
  const pageCount = Math.ceil(result.count / 5),
    users = result.rows;
  res.status(200).json({ pageCount, users });
});
    } else {
      res.status(200).json({ pageCount: 0, users: [] });
    }
  }

/**
 * @return {Array} Array of objects containing groups a user belongs to
 * @param {obj} req
 * @param {obj} res
 */
  static getUserGroups(req, res) {
    User.findOne({ attributes: ['id'], where: { username: req.params.username } })
    .then((user) => {
      const userId = user.id;
      Group.findAll({ attributes: [['id', 'groupId'], 'groupName', 'description'], where: { userId } })
    .then((groups) => {
      if (groups) {
        res.status(200).json({ groups });
      }
    });
    });
  }
/**
 * @return {Array} Returns arrays of groups a user belongs to
 * @param {obj} req
 * @param {obj} res
 */
  static usersGroup(req, res) {
    const userId = req.params.userId;
    UsersGroup.findAll({ attributes: ['groupId'], where: { userId } })
    .then((groupIds) => {
      if (groupIds) {
        const ids = [];
        groupIds.forEach((group) => {
          ids.push(group.dataValues.groupId);
        });
        Group.findAll({ attributes: [['id', 'groupId'], 'groupName', 'description'], where: { id: ids } })
        .then((groups) => {
          if (groups) {
            res.status(200).json({ groups });
          }
        });
      }
    });
  }
  /**
 *
 * @param {obj} req
 * @param {obj} res
 * @param {obj} next
 * @return {obj} Returns success message with data or failure message
 */
static messages(req, res) {
  const message = req.body.message,
    priority = req.body.priority,
    groupId = req.params.groupId,
    userId = req.body.userId,
    username = req.body.username;
  return Message.sync({ force: false }).then(() => {
    Message.create({ userId, groupId, message, priority, username }).then((content) => {
      res.status(200).json({
        data: {
          username: content.username,
          groupId: content.groupId,
          message: content.message,
          priority: content.priority,
          createdAt: content.createdAt
        },
        message: 'Message sent'
      });
    }).catch((error) => {
      if (error) {
        res.status(400).json({ message: 'Message sending failed' });
      }
    });
  });
}

  /**
  * @return {json} Success message with results or error message
  * @param {obj} req
  * @param {obj} res
  * @param {obj} next
  *
  */
  static getMessages(req, res) {
    const groupId = req.params.groupId;
    const userId = req.decoded.userId;
    console.log(req.decoded.userId);
    const isGroupId = Number.isInteger(parseInt(groupId, 10));
    if (isGroupId) {
      Group.findOne({ attributes: ['groupName', 'userId'], where: { id: groupId } }).then((groupCreator) => {
        if (groupCreator.dataValues.userId === userId) {
          Message.findAll({ attributes: ['id', 'message', 'groupId', 'userId', 'priority', 'username', 'createdAt'],
            where: {
              groupId, archived: false
            },
            order: [['createdAt', 'DESC']]
          }).then((data) => {
            if (data) {
              res.status(200).json({
                data,
                message: 'Received',
                groupCreator: true
              });
            }
          });
        } else {
          Message.findAll({ attributes: ['id', 'message', 'groupId', 'userId', 'priority', 'username', 'createdAt'],
            where: {
              groupId
            },
            order: [['createdAt', 'DESC']]
          }).then((data) => {
            if (data) {
              res.status(200).json({
                data,
                message: 'Received',
                groupCreator: false
              });
            }
          });
        }
      });
    }
  }

  /**
  * @return {array} Array of objects
  * @param {obj} req
  * @param {obj} res
  */
  static getUserMessages(req, res) {
    const userId = req.params.userId,
      groupId = req.params.groupId,
      isUserId = Number.isInteger(parseInt(userId, 10)),
      isGroupId = Number.isInteger(parseInt(groupId, 10));
    if (isUserId && isGroupId) {
      Message.findAll({ attributes: ['groupId', 'message', 'priority', 'createdAt', 'username'],
        where: {
          groupId, userId, archived: false
        },
        order: [['createdAt', 'DESC']]
      }).then((data) => {
        if (data) {
          res.status(200).json({
            data,
            message: 'Received'
          });
        }
      });
    }
  }
}
