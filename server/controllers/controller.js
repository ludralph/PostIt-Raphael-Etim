/* eslint linebreak-style: ['error', 'windows']*/

'esversion: 6';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Users from '../models/users';
import Group from '../models/group';
import GroupMembers from '../models/groupMembers';
import Messages from '../models/messages';


/**
 * @class ApiController
 */
export default class ApiController {
  /**
 * Users details are captured by this method on signup and persisted on the database
 * @param {obj} req
 * @param {obj} res
 * @param {obj} next
 * @return {JSON} Returns success or failure message with the data
 *
 */
  static signup(req, res) {
    const name = req.body.name,
      username = req.body.username,
      email = req.body.email,
      password = req.body.password;
    return Users.sync({ force: false }).then(() => {
      const saltRounds = 10;
      bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          Users.create({
            name, username, email, password: hash
          }).then((User) => {
            res.status(200).json({
              status: 'success',
              data: User,
              message: 'Account created'
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
    const username = req.body.username,
      password = req.body.password;
    Users.findOne({ where: { username } }).then((user) => {
      if (user && user.dataValues.username === username) {
        const check = bcrypt.compareSync(password, user.dataValues.password);
        const payload = { username: user.dataValues.username };
        if (check) {
          const token = jwt.sign(payload, 'kitongifuuiiwtylkkksshdywywy', {
            expiresIn: 60 * 60 * 24
          });
          res.status(200).json({
            status: 'Success',
            data: user,
            message: 'Logged In',
            token
          });
        } else {
          res.status(401).json({ status: 'Invalid Password' });
        }
      } else {
        res.json({ status: 'User not found' });
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
    const token = req.body.token || req.query.token || req.headers.authorization['x-access-token'];
    // decode token
    if (token) {
    // verifies secret and checks exp
      jwt.verify(token, 'kitongifuuiiwtylkkksshdywywy', (err, decoded) => {
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
        message: 'Access denied. Login first'
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
        res.status(200).json({
          status: 'success',
          data: group,
          message: 'Group Created'
        });
      }).catch((err) => {
        if (err) {
          res.json({ status: 'Invalid input. groupName exists already or userId does not exist' });
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
  static groups(req, res) {
    const groupId = req.params.groupId,
      admin = req.body.admin,
      userId = req.body.userId;
    return GroupMembers.sync({ force: false }).then(() => {
      GroupMembers.create({ groupId, admin, userId }).then((data) => {
        res.status(200).json({
          status: 'success',
          data,
          message: 'User added'
        });
      }).catch((err) => {
        if (err) {
          res.json({ status: 'Invalid input type. userId or groupId do not exist' });
        }
      });
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
      userId = req.body.userId;
    return Messages.sync({ force: false }).then(() => {
      Messages.create({ userId, groupId, message, priority }).then((content) => {
        res.status(200).json({
          status: 'success',
          data: content,
          message: 'Message sent'
        });
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
    Messages.findAll({
      where: {
        groupId
      }
    }).then((result) => {
      if (result) {
        res.status(200).json({
          status: 'Success',
          data: result,
          message: 'Received'
        });
      }
    });
  }
}
