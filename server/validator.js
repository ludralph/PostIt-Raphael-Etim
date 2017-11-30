/**
 * @class Validator
 */
export default class Validator {
    /**
     * @return {json} Validates the inputs before allowing access to the db
     * @param {obj} req
     * @param {obj} res
     * @param {obj} next
     */
  static signupInputs(req, res, next) {
    const name = req.body.name,
      username = req.body.username,
      email = req.body.email,
      password = req.body.password;
    if (name === '' || username === '' || email === '' || password === '') {
      res.json({ message: 'name, username, email, and password fields needs not be empty ' });
    } else if (!name || !username || !email || !password) {
      res.json({ message: 'name, username, email and password fields are required' });
    } else {
      next();
    }
  }

/**
     * @return {json} Validates the inputs before allowing access to the db
     * @param {obj} req
     * @param {obj} res
     * @param {obj} next
     */
  static signinInputs(req, res, next) {
    const email = req.body.email,
      password = req.body.password;
    if (email === '' || password === '') {
      res.json({ message: 'email or password field must not be empty' });
    } else if (!email || !password) {
      res.json({ message: 'email and password fields are required' });
    } else {
      next();
    }
  }

/**
     * @return {json} Validates the inputs before allowing access to the db
     * @param {obj} req
     * @param {obj} res
     * @param {obj} next
     */
  static createGroupInputs(req, res, next) {
    const groupName = req.body.groupName,
      description = req.body.description,
      userId = req.body.userId;
      console.log(req.body, '???????????');
      console.log(`=========${req.body.userId}`);
      console.log(`=========${req.body.description}`);
    if (groupName === '' || description === '' || userId === '') {
      res.json({ message: 'groupName, description, and userId fields should not be empty' });
    } else if (!groupName || !description || !userId) {
      res.json({ message: 'groupName, description and userId fields are required' });
      console.log(res.body.descr, res.body, '------------,');
    } else {
      next();
    }
  }

/**
     * @return {json} Validates the inputs before allowing access to the db
     * @param {obj} req
     * @param {obj} res
     * @param {obj} next
     */
  static groupsInputs(req, res, next) {
    const username = req.body.username;
    if (username === '') {
      res.json({ message: 'username must not be empty' });
    } else if (!username) {
      res.json({ message: 'username field is required' });
    } else {
      next();
    }
  }

/**
     * @return {json} Validates the inputs before allowing access to the db
     * @param {obj} req
     * @param {obj} res
     * @param {obj} next
     */
  static messagesInputs(req, res, next) {
    const message = req.body.message,
      priority = req.body.priority,
      userId = req.body.userId;
    if (message === '' || priority === '' || userId === '') {
      res.json({ message: 'message, priority and userId need not be empty' });
    } else if (!message || !priority || !userId) {
      res.json({ message: 'message, priority and userId fields are required' });
    } else {
      next();
    }
  }
}