/* eslint linebreak-style: ['error', 'windows']*/

'esversion: 6';

import express from 'express';
import controller from '../controllers/controller';
import Validate from '../validator';

const router = express.Router();

// Route for user signup
router.post('/signup', Validate.signupInputs, controller.signup);

// Route for signin
router.post('/signin', Validate.signinInputs, controller.signin);

// Middleware to protect routes
router.use(controller.ensureToken);

// Route to post group create info
router.post('/group', Validate.createGroupInputs, controller.createGroup);

// Route to add users to group
router.post('/group/:groupId/user', Validate.groupsInputs, controller.groups);

// Route to post messages to groups
router.post('/group/:groupId/messages', Validate.messagesInputs, controller.messages);

// Route to get messages posted to groups
router.get('/group/:groupId/messages', controller.getMessages);

export default router;
