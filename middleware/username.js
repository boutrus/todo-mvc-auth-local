// middleware.js
function attachUserName(req, res, next) {
    res.locals.userName = req.user.username; // Assuming 'username' is the property containing the user's username
    next();
  }
  
  module.exports = {
    attachUserName,
  };
  