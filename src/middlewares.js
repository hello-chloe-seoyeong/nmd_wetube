export const localsMiddleware = (req, res, next) => {
  // if(req.session.loggedIn) {
  //   res.locals.loggedIn = true;
  // }
  // console.log(req.session);
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Wetube";
  res.locals.loggedInUser = req.session.user || {};
  next();
};
