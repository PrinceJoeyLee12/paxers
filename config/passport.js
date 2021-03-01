const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const normalizeUrl = require('normalize-url');

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
          email: profile.emails[0].value,
        };

        console.log(profile);
        const user = await User.findOne({ email: newUser.email });

        if (user) {
          done(null, user);
        } else {
          try {
            const user = new User(newUser);

            // Hash password before saving in database
            const salt = await bcrypt.genSalt(10);
            const password = 'password- ' + (await bcrypt.hash(email, salt));
            user.password = password;
            user.image = normalizeUrl(user.image, { forceHttps: true });

            const newUserData = await user.save();
            console.log(newUserData);
            done(null, newUserData);
          } catch (err) {
            console.log(err);
          }
        }
      },
    ),
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};
