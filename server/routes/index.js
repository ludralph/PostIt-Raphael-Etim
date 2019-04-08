import express from 'express';
import authenticate from '../middlewares/authenticate';
import validateInput from '../middlewares/validateInput';
import user from '../controllers/user';
import group from '../controllers/group';
import message from '../controllers/message';

const router = express.Router();

// home route
router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to PostIT API'
  });
});

// route for user sign up
router.post('/signup', validateInput.validateSignupInput, user.signup);

// route for user sign in
router.post('/signin', user.signin);

// route to update password
router.put('/forgotpassword', user.forgotPassword);

// route to reset password
router.put('/resetpassword/:token', user.resetPassword);

// route to search for users
router.get('/search/users', authenticate.verifyUser, user.searchUser);

router.get('/user/:userId/groups', authenticate.verifyUser, user.listGroups);

// route to create groups
router.post('/group', authenticate.verifyUser, validateInput.validateGroupname,
 group.create);

// route to update a group
router.put('/group/:groupId', authenticate.verifyUser,
  validateInput.validateGroupname, group.edit);

// route to get a group by id
router.get('/group/:groupId', authenticate.verifyUser, group.get);

// route to add user to a group
router.post('/group/:groupId/user', authenticate.verifyUser, group.addUser);

// route to list users in a group
router.get('/group/:groupId/users', authenticate.verifyUser, group.listUsers);

// route to post message to a group
router.post('/group/:groupId/message', authenticate.verifyUser,
  validateInput.validateMessageInput, message.create);

// route to retrieve messages from a particular group
router.get('/group/:groupId/messages', authenticate.verifyUser, message.list);

export default router;
