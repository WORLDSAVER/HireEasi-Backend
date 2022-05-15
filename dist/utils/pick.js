"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pick = function (object, keys) {
    return keys.reduce(function (obj, key) {
        if (object && Object.prototype.hasOwnProperty.call(object, key)) {
            // eslint-disable-next-line no-param-reassign
            obj[key] = object[key];
        }
        return obj;
    }, {});
};
exports.default = pick;
//# sourceMappingURL=pick.js.map