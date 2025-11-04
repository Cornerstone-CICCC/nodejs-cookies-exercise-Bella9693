"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedOut = exports.checkAuth = void 0;
const checkAuth = (req, res, next) => {
    var _a;
    if ((_a = req.signedCookies) === null || _a === void 0 ? void 0 : _a.isLoggedIn) {
        next();
    }
    else {
        res.redirect("/login");
    }
};
exports.checkAuth = checkAuth;
const isLoggedOut = (req, res, next) => {
    var _a;
    if (!((_a = req.signedCookies) === null || _a === void 0 ? void 0 : _a.isLoggedIn)) {
        next();
    }
    else {
        res.redirect("/my-account");
    }
};
exports.isLoggedOut = isLoggedOut;
