import multer from "multer";

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

export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/login");
  }
};

export const publicMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/");
  }
};

export const uploadFiles = multer({ dest: "uploads/" });
