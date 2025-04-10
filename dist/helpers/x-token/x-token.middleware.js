"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var XTokenMiddleware_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.XTokenMiddleware = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let XTokenMiddleware = XTokenMiddleware_1 = class XTokenMiddleware {
    logger = new common_1.Logger(XTokenMiddleware_1.name);
    async use(req, res, next) {
        const apiKey = req.headers['x-api-key'];
        const authServer = process.env.KEYCLOAK_SERVER_URL;
        const realmName = process.env.KEYCLOAK_REALM;
        if (!apiKey) {
            this.logger.warn('Missing x-api-key header');
            throw new common_1.HttpException('x-api-key header is required', common_1.HttpStatus.BAD_REQUEST);
        }
        if (!authServer || !realmName) {
            this.logger.error('KEYCLOAK_SERVER_URL or KEYCLOAK_REALM is not defined');
            throw new common_1.HttpException('Internal configuration error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        const validationUrl = `${authServer}/realms/${realmName}/check?apiKey=${apiKey}`;
        try {
            const response = await axios_1.default.get(validationUrl);
            if (response.status === 200) {
                this.logger.debug('API key validated successfully');
                return next();
            }
            this.logger.warn(`Unexpected response from auth server: ${response.status}`);
            throw new common_1.HttpException('Unexpected response from authorization server', common_1.HttpStatus.FORBIDDEN);
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
                const axiosError = error;
                if (axiosError.response) {
                    const { status, data } = axiosError.response;
                    this.logger.warn(`Auth server responded with status ${status}: ${JSON.stringify(data)}`);
                    if (status === 401) {
                        throw new common_1.HttpException('Unauthorized request', common_1.HttpStatus.UNAUTHORIZED);
                    }
                    throw new common_1.HttpException(`Authorization failed with status ${status}`, common_1.HttpStatus.FORBIDDEN);
                }
                this.logger.error('No response from authorization server');
                throw new common_1.HttpException('Authorization server not reachable', common_1.HttpStatus.SERVICE_UNAVAILABLE);
            }
            this.logger.error('Unknown error occurred during token validation', error);
            throw new common_1.HttpException('Internal server error during authorization', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.XTokenMiddleware = XTokenMiddleware;
exports.XTokenMiddleware = XTokenMiddleware = XTokenMiddleware_1 = __decorate([
    (0, common_1.Injectable)()
], XTokenMiddleware);
//# sourceMappingURL=x-token.middleware.js.map