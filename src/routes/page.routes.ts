import { Router, Request, Response } from "express";
import { checkAuth, isLoggedOut } from "../middleware/auth.middleware";
import { User } from "../types/user";

const pageRouter = Router();

const users: User[] = [{ id: 1, username: "admin", password: "admin12345" }];

pageRouter.get("/", (req: Request, res: Response) => {
  res.status(200).render("home", {
    pageTitle: "Home",
    username: req.signedCookies?.username || null,
  });
});

pageRouter.get("/login", isLoggedOut, (req: Request, res: Response) => {
  res.status(200).render("login", { error: null });
});

pageRouter.post(
  "/login",
  (
    req: Request<{}, {}, { username: string; password: string }>,
    res: Response
  ) => {
    const { username, password } = req.body;

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      return res
        .status(401)
        .render("login", { error: "Invalid username or password" });
    }

    res.cookie("isLoggedIn", true, {
      httpOnly: true,
      signed: true,
      maxAge: 3 * 60 * 1000,
    });
    res.cookie("username", username, {
      httpOnly: true,
      signed: true,
      maxAge: 3 * 60 * 1000,
    });

    res.redirect("/my-account");
  }
);

pageRouter.get("/logout", (req: Request, res: Response) => {
  res.clearCookie("isLoggedIn");
  res.clearCookie("username");
  res.redirect("/login");
});

pageRouter.get("/my-account", checkAuth, (req: Request, res: Response) => {
  const username = req.signedCookies?.username;
  res.status(200).render("my-account", { username });
});

pageRouter.get("/admin", checkAuth, (req: Request, res: Response) => {
  res.status(200).send("Welcome admin user!");
});

export default pageRouter;
