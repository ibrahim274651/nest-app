"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSwaggerConfig = void 0;
const app_constants_1 = require("../../app.constants");
const app_helper_service_1 = require("../app.helper.service");
const createSwaggerConfig = (configService) => {
    const ipAddress = (0, app_helper_service_1.getServerIp)();
    const swaggerPath = configService.get('URL_PREFIX') || 'default-path';
    const port = configService.get('PORT') || 4010;
    const swaggerUrl = `http://${ipAddress}:${port}/${swaggerPath}`;
    return {
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
};
exports.createSwaggerConfig = createSwaggerConfig;
//# sourceMappingURL=swagger.config.js.map