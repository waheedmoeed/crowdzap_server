mongoose = require("mongoose");
UserService = mongoose.model("users");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
// const GoogleStrategy = require('passport-google-oauth20').Strategy;

// const keys = require("./keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

module.exports = (passport) => {
  passport.use(
      new JwtStrategy(opts, (jwtPayload, done) => {
        User.findById(jwtPayload.id)
            .then((user) => {
              if (user) {
                return done(null, user);
              }
              return done(null, false);
            })
            .catch((err) => console.log(err));
      }),
  );
};
