module.exports = (req, res, next) => {
  if (req.cookies.optica) {
    req.session.userLogin = req.cookies.optica;
  }
  next();
};
