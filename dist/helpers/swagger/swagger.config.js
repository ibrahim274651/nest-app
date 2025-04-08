"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SWAGGER_CONFIG = void 0;
const app_constants_1 = require("@/app.constants");
const app_helper_service_1 = require("../app.helper.service");
const ipAddress = (0, app_helper_service_1.getServerIp)();
const swaggerPath = process.env.URL_PREFIX || 'default-path';
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 4010;
const swaggerUrl = `http://${ipAddress}:${port}/${swaggerPath}`;
exports.SWAGGER_CONFIG = {
    info: {
        title: app_constants_1.SwaggerConstants.title,
        description: app_constants_1.SwaggerConstants.description,
        termsOfService: app_constants_1.SwaggerConstants.termsOfService,
        version: '1.0.0',
    },
    tags: [],
    url: swaggerUrl,
    port: port,
    serverDescription: 'Local environment',
    path: swaggerPath,
};
//# sourceMappingURL=swagger.config.js.map