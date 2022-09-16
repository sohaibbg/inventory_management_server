const db = require('../db');
const router = require('express').Router();
const { body } = require('express-validator');
const { register } = require('../controllers/register');
const { login } = require('../controllers/login');
const { getUser } = require('../controllers/getUser');
const jwt = require('jsonwebtoken');

router.post('/register', [
  body('name', "The name must be of minimum 3 characters length")
    .notEmpty()
    .escape()
    .trim()
    .isLength({ min: 3 }),
  body('email', "Invalid email address")
    .notEmpty()
    .escape()
    .trim().isEmail(),
  body('password', "The Password must be of minimum 4 characters length").notEmpty().trim().isLength({ min: 4 }),
  body('designation_id', "Incompatible designation_id").notEmpty().trim(),
], register);


router.post('/login', [
  body('email', "Invalid email address")
    .notEmpty()
    .escape()
    .trim().isEmail(),
  body('password', "The Password must be of minimum 4 characters length")
    .notEmpty()
    .trim()
    .isLength({ min: 4 }),
], login);

/// DELETE user
router.delete('/delete', async function (req, res, next) {
  try {
      if (
          !req.headers.authorization ||
          !req.headers.authorization.startsWith('Bearer') ||
          !req.headers.authorization.split(' ')[1]
      ) {
          return res.status(422).json({
              message: "Please provide the token",
          });
      }
      const theToken = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(theToken, "0F#ku%0Rz9$.s%06>\"a-MdhL]S+>v{");
      
      const result = await db.query(
          `call deactivate_user(?,?);`,
          [decoded.id,req.body.user_id]
      );
      res.json(result[0][0]);
  } catch (err) {
      console.error(err.message);
      next(err);
  }
});
/// PUT set details
router.put('/set_details', async function (req, res, next) {
  try {
      if (
          !req.headers.authorization ||
          !req.headers.authorization.startsWith('Bearer') ||
          !req.headers.authorization.split(' ')[1]
      ) {
          return res.status(422).json({
              message: "Please provide the token",
          });
      }
      const theToken = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(theToken, "0F#ku%0Rz9$.s%06>\"a-MdhL]S+>v{");
      const result = await db.query(
          `call set_user_details(?,?,?,?,?);`,
          [
            decoded.id,
            req.body.user_id,
            req.body.username,
            req.body.email,
            req.body.passhash
          ]
      );
      res.json(result[0][0]);
  } catch (err) {
      console.error(err.message);
      next(err);
  }
});
/// GET sub department users
router.get('/get_all', async function (req, res, next) {
  try {
      if (
          !req.headers.authorization ||
          !req.headers.authorization.startsWith('Bearer') ||
          !req.headers.authorization.split(' ')[1]
      ) {
          return res.status(422).json({
              message: "Please provide the token",
          });
      }
      const theToken = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(theToken, "0F#ku%0Rz9$.s%06>\"a-MdhL]S+>v{");
      const result = await db.query(
          `call get_dep_users(?);`,
          [decoded.id]
      );
      res.json(result);
  } catch (err) {
      console.error(err.message);
      next(err);
  }
});


router.get('/getuser', getUser);

module.exports = router;