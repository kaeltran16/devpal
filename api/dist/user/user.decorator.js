"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
exports.User = common_1.createParamDecorator((data, req) => {
    if (!!req.user) {
        return !!data ? req.user[data] : req.user;
    }
    const token = req.headers.authorization
        ? req.headers.authorization.split(' ')
        : null;
    if (token && token[1]) {
        const decoded = jwt.verify(token[1], 'test');
        return !!data ? decoded[data] : decoded;
    }
});
//# sourceMappingURL=user.decorator.js.map