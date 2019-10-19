const Router = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = Router();

const User = require('../models/User');
const config = require('../config');
const saltRounds = 10;

router.post('/register', async (req, res) => {
  const { email, login, password } = req.body;

  if (!email || !login || !password) {
    return res.status('400').json({ message: 'All fields are required' });
  } else {
    const user = await User.findOne({ email });
    if (user) {
      return res.status('400').json({ message: 'User already exists' });
    } else {
      const newUser = await new User({
        password,
        email,
        login
      });
      bcrypt.genSalt(saltRounds, async function(err, salt) {
        if (err) {
          console.log(err);
        } else {
          bcrypt.hash(password, salt, async function(err, hash) {
            if (err) {
              console.log(err);
            } else {
              newUser.password = hash;
              await newUser.save();

              const payload = {
                id: newUser._id
              };

              jwt.sign(
                payload,
                config.secretWord,
                {
                  expiresIn: 360000
                },
                (err, token) => {
                  if (err) throw err;
                  res.json({
                    token,
                    user: {
                      id: newUser._id,
                      login: newUser.login,
                      email: newUser.email
                    }
                  });
                }
              );
            }
          });
        }
      });
    }
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status('400').json({ message: 'All fields are required' });
  } else {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status('400').json({ message: 'User not found' });
    } else {
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res.status('400').json({ message: 'Invalid password' });
      } else {
        jwt.sign(
          { id: user._id },
          config.secretWord,
          {
            expiresIn: 360000
          },
          (err, token) => {
            if (err) throw err;
            res.json({
              token,
              user: {
                id: user._id,
                login: user.login,
                email: user.email
              }
            });
          }
        );
      }
    }
  }
});

const checkByToken = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token)
    return res.status(401).json({ msg: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token, config.secretWord);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
};

router.get('/user', checkByToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
