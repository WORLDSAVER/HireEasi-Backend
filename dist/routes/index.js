"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var e_1, _a;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_route_1 = __importDefault(require("./auth.route"));
var VerifyToken_1 = __importDefault(require("../middlewares/VerifyToken"));
var router = (0, express_1.Router)();
var routes = [
    {
        path: '/auth',
        route: auth_route_1.default
    },
];
try {
    for (var routes_1 = __values(routes), routes_1_1 = routes_1.next(); !routes_1_1.done; routes_1_1 = routes_1.next()) {
        var route = routes_1_1.value;
        if (route.path === '/auth') {
            router.use(route.path, route.route);
        }
        else {
            router.use(route.path, VerifyToken_1.default, route.route);
        }
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (routes_1_1 && !routes_1_1.done && (_a = routes_1.return)) _a.call(routes_1);
    }
    finally { if (e_1) throw e_1.error; }
}
exports.default = router;
//# sourceMappingURL=index.js.map