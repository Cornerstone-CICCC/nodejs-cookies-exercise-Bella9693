"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const pageRouter = (0, express_1.Router)();
const users = [{ id: 1, username: "admin", password: "admin12345" }];
pageRouter.get("/", (req, res) => {
    var _a;
    res.status(200).render("home", {
        pageTitle: "Home",
        username: ((_a = req.signedCookies) === null || _a === void 0 ? void 0 : _a.username) || null,
    });
});
pageRouter.get("/login", auth_middleware_1.isLoggedOut, (req, res) => {
    res.status(200).render("login", { error: null });
});
pageRouter.post("/login", (req, res) => {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username && u.password === password);
    if (!user) {
        return res
            .status(401)
            .render("login", { error: "Invalid username or password" });
    }
    // 로그인 성공 → 쿠키 설정 (signed)
    res.cookie("isLoggedIn", true, {
        httpOnly: true,
        signed: true,
        maxAge: 3 * 60 * 1000, // 3분
    });
    res.cookie("username", username, {
        httpOnly: true,
        signed: true,
        maxAge: 3 * 60 * 1000,
    });
    res.redirect("/my-account");
});
pageRouter.get("/logout", (req, res) => {
    res.clearCookie("isLoggedIn");
    res.clearCookie("username");
    res.redirect("/login");
});
pageRouter.get("/my-account", auth_middleware_1.checkAuth, (req, res) => {
    var _a;
    const username = (_a = req.signedCookies) === null || _a === void 0 ? void 0 : _a.username;
    res.status(200).render("my-account", { username });
});
pageRouter.get("/admin", auth_middleware_1.checkAuth, (req, res) => {
    res.status(200).send("Welcome admin user!");
});
exports.default = pageRouter;
