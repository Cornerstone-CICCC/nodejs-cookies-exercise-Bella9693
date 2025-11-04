import { Request, Response, NextFunction } from "express";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.signedCookies?.isLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
};

export const isLoggedOut = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.signedCookies?.isLoggedIn) {
    next();
  } else {
    res.redirect("/my-account");
  }
};
