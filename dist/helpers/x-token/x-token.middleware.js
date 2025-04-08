"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XTokenMiddleware = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let XTokenMiddleware = class XTokenMiddleware {
    async use(req, res, next) {
        const apiKey = req.headers['x-api-key'];
        const authServer = process.env.KEYCLOAK_SERVER_URL;
        const realmName = process.env.KEYCLOAK_REALM;
        try {
            const response = await axios_1.default.get(authServer + '/realms/' + realmName + '/check?apiKey=' + apiKey);
            console.log(response.status);
            next();
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
                const axiosError = error;
                if (axiosError.response?.status === 401) {
                    console.log('No authorized ');
                    throw new common_1.HttpException('Unauthorized request', common_1.HttpStatus.UNAUTHORIZED);
                }
            }
            throw new common_1.HttpException('Difficile de trouver le serveur', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.XTokenMiddleware = XTokenMiddleware;
exports.XTokenMiddleware = XTokenMiddleware = __decorate([
    (0, common_1.Injectable)()
], XTokenMiddleware);
//# sourceMappingURL=x-token.middleware.js.map