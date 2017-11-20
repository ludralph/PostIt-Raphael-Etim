import express from 'express';
import authenticate from '../middlewares/authenticate';
import validateInput from '../middlewares/validateInput';
import user from '../controllers/user';
import group from '../controllers/group';
import message from '../controllers/message';

const router = express.Router();

// route for user sign up
router.post('/api/signup', validateInput.validateSignupInput, user.signup);

// route for user sign in
router.post('/api/signin', user.signin);

// route to update password
router.put('/api/forgotpassword', user.forgotPassword);

// route to reset password
router.put('/api/resetpassword/:token', user.resetPassword);

// route to search for users
router.get('/api/search/users', authenticate.verifyUser, user.searchUser);

router.get('/api/user/:userId/groups', authenticate.verifyUser, user.listGroups);

// route to create groups
router.post('/api/group', authenticate.verifyUser, validateInput.validateGroupname, group.create);

// route to update a group
router.put('/api/group/:groupId', authenticate.verifyUser, validateInput.validateGroupname, group.edit);

// route to get a group by it
router.get('/api/group/:groupId', authenticate.verifyUser, group.get);

// route to add user to a group
router.post('/api/group/:groupId/user', authenticate.verifyUser, group.addUser);
// route to list users in a group
router.get('/api/group/:groupId/users', authenticate.verifyUser, group.listUsers);

// route to post message to a group
router.post('/api/group/:groupId/message', authenticate.verifyUser, validateInput.validateMessageInput, message.create);

// route to retrieve messages from a particular group
router.get('/api/group/:groupId/messages', authenticate.verifyUser, message.list);

export default router;
