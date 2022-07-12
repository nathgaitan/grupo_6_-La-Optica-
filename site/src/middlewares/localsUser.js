module.exports = (req, res, next) => {
  if (req.session.userLogin2) {
    delete req.session.userLogin;
    req.session.userLogin = req.session.userLogin2;
    res.locals.userLogin = req.session.userLogin;
  }
  if (req.session.userLogin) {
    res.locals.userLogin = req.session.userLogin;
  }
  next();
};
