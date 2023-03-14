module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    console.log("Not Authenticated!")
    res.redirect("/auth/login");
  },
  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    console.log("Authenticated!")
    res.redirect("/");
    
  },
  ensureAdmin: function (req, res, next) {
    if (req.isAuthenticated()) {
      if (req.user.admin == "true"){
        return next();
      }
    }
    res.redirect("/");
  },
};