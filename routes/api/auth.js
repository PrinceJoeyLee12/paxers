const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const router = express.Router();
const normalizeUrl = require('normalize-url');
const passport = require('passport');

const {
  headerCheckTokenMiddleware,
  checkTokenMiddleware,
} = require('../../middleware/auth');
const User = require('../../models/User');

const validateLoginInput = require('../../helpers/loginValidate');
const {
  validateResetPasswordEmailInput,
  validateResetPasswordInput,
} = require('../../helpers/resetPasswordValidate');

// @route    GET api/auth
// @desc     Get user by token
// @access   Private
router.get('/', headerCheckTokenMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

// @route      POST api/user/login
// @desc       Login user
// @access     public
router.post('/login', async (req, res) => {
  const { isValid, errors } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ email: 'Email not found!' });
    } else {
      if (user.password.includes('password-')) {
        return res.status(400).json({
          email:
            "You've logged in using google \n lately try to login with your google account",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ password: 'Password is incorrect' });

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.SECRET_KEY,
        { expiresIn: process.env.TOKEN_EXPIRATION },
        (err, token) => {
          if (err)
            return res
              .status(401)
              .json({ msg: 'Cannot generate Token as of the moment ' });
          res.json({ token });
        },
      );
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: 'Server Error!' });
  }
});

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${process.env.CLIENT_URL}/login`,
  }),
  (req, res) => {
    console.log(req.user._id);
    try {
      const payload = {
        user: {
          id: req.user._id,
        },
      };
      jwt.sign(
        payload,
        process.env.SECRET_KEY,
        { expiresIn: process.env.TOKEN_EXPIRATION },
        (err, token) => {
          if (err) {
            return res.redirect('/login');
          }
          // console.log(req.headers.host);
          // res.redirect(`${req.headers.host}/${token}`); //upon deploying to the heroku I can opt to this option
          res.redirect(`${process.env.CLIENT_URL}/auth/${token}`);
        },
      );
    } catch (err) {
      console.log(err);
      res.redirect('/login');
    }
  },
);

// @route     POST /auth/google
// @desc      Auth with Google
// @access     public
router.post('/google', async (req, res) => {
  const { email, firstName, lastName, image } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    try {
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        process.env.SECRET_KEY,
        { expiresIn: process.env.TOKEN_EXPIRATION },
        (err, token) => {
          if (err) {
            return res
              .status(401)
              .json({ msg: 'Cannot generate Token as of the moment ' });
          }
          return res.json({ token });
        },
      );
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ msg: 'Server Error!' });
    }
  } else {
    try {
      // Hash password before saving in database
      const salt = await bcrypt.genSalt(10);
      const password = 'password- ' + (await bcrypt.hash(email, salt));
      console.log('user password: ' + password);

      user = new User({
        firstName,
        lastName,
        email,
        image,
        password,
      });

      user.image = normalizeUrl(user.image, { forceHttps: true });

      await user.save();
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.SECRET_KEY,
        { expiresIn: process.env.TOKEN_EXPIRATION },
        (err, token) => {
          console.log(err);
          if (err)
            return res.json({ msg: 'Cannot generate token as of the moment' });
          console.log(token);
          res.json({ token });
        },
      );
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ msg: 'Server Error' });
    }
  }
});

// @route      POST api/auth/forgotpassword
// @desc       Forgotpassword sending link to email
// @access     public
router.post('/forgotpassword', async (req, res) => {
  const { isValid, errors } = validateResetPasswordEmailInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { email } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ email: 'Email not found!' });
    } else {
      try {
        const payload = {
          user: {
            id: user.id,
          },
        };

        jwt.sign(
          payload,
          process.env.SECRET_KEY,
          { expiresIn: '10mins' },
          (err, token) => {
            console.log(token);
            if (err) {
              return res
                .status(401)
                .json({ msg: 'Cannot generate Token as of the moment ' });
            } else {
              var transporter = nodemailer.createTransport({
                service: 'gmail',
                type: 'SMTP',
                host: 'smtp.gmail.com',
                secure: true,
                auth: {
                  user: process.env.GOOGLE_EMAIL,
                  pass: process.env.GOOGLE_EMAIL_PASS,
                },
              });

              console.log(process.env.CLIENT_URL);

              const emailData = {
                from: process.env.GOOGLE_EMAIL,
                to: email,
                subject: `Password Reset link`,
                html: `
                      <h1>Please use the following link to reset your password</h1>
                      <p>${process.env.CLIENT_URL}/reset-password/${token}</p>
                      <hr />
                      <p>This email may contain sensitive information</p>
                      <p>${process.env.CLIENT_URL}</p>
                  `,
              };
              transporter.sendMail(emailData, function (error, info) {
                if (error) {
                  console.log(error);
                  res.status(500).json({
                    msg: `Cannot send link to ${email}. There's a failure in our side.`,
                  });
                } else {
                  console.log(info);
                  res.json({
                    msg: `Link was successfully sent to ${email}. Please Check your Inbox`,
                  });
                }
              });
            }
          },
        );
      } catch (err) {
        console.log(err);
      }
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: 'Server Error!' });
  }
});

// @route      POST api/auth/reset-password
// @desc       Reset password in database
// @access     public
router.post('/reset-password', checkTokenMiddleware, async (req, res) => {
  const { isValid, errors } = validateResetPasswordInput(req.body);

  const { password } = req.body;

  if (!isValid) {
    console.log('not valid');
    console.log(errors);
    return res.status(403).json(errors);
  }

  const user = await User.findById(req.user.id).select('password');

  try {
    if (user) {
      // Change Password Here and update database

      // Hash password before saving in database
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      const updatePassword = {
        password: user.password,
      };
      const filter = {
        _id: user._id,
      };

      await User.findOneAndUpdate(
        filter,
        updatePassword,
        {
          new: true,
        },
        (err, result) => {
          if (err) {
            return res
              .status(400)
              .json({ msg: "There's something wrong in saving new password" });
          } else {
            console.log(result);
            res.json({
              msg: "You've successfully changed your password try login",
            });
          }
        },
      );
    }
  } catch (err) {
    return res.status(500).json({
      msg:
        "We're sorry something went wrong on our side. Please try again later",
    });
  }
});

module.exports = router;
