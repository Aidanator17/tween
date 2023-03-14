const passport = require("passport");
const db = require('../controllers/databaseGrab')
const LocalStrategy = require("passport-local").Strategy;

const localLogin = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    const user = await db.userLogin(email,password)
    // console.log("passport.js log:",user)
    return user
      ? done(null, user)
      : done(null, false, {
          message: "Your login details are not valid. Please try again",
        });
  }
);

passport.serializeUser(function (user, done) {
  // console.log("serialize user log:",user.id)
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  let user = await db.getUserById(id);
  // console.log("deserialize user log:",user.id)
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

module.exports = passport.use(localLogin)