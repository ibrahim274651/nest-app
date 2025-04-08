"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerConfiguration = swaggerConfiguration;
exports.swaggerLogger = swaggerLogger;
const swagger_1 = require("@nestjs/swagger");
const swagger_config_1 = require("./swagger.config");
const swagger_custom_options_1 = require("./swagger-custom-options");
const app_constants_1 = require("@/app.constants");
function swaggerConfiguration(app) {
    const builder = new swagger_1.DocumentBuilder()
        .setTitle(swagger_config_1.SWAGGER_CONFIG.info.title)
        .setTermsOfService(swagger_config_1.SWAGGER_CONFIG.info.termsOfService)
        .setDescription(swagger_config_1.SWAGGER_CONFIG.info.description)
        .setVersion(swagger_config_1.SWAGGER_CONFIG.info.version)
        .addServer(swagger_config_1.SWAGGER_CONFIG.url, swagger_config_1.SWAGGER_CONFIG.serverDescription)
        .addServer(process.env.SERVER_URL_PRODUCTION || 'http://default-production-url', 'Productions environment')
        .addServer(process.env.SERVER_URL || 'http://default-production-url', 'Test environment')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
    }, 'authorization');
    const options = builder.build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    const customOptions = (0, swagger_custom_options_1.getCustomSwaggerOptions)(app);
    swagger_1.SwaggerModule.setup(swagger_config_1.SWAGGER_CONFIG.path, app, document, customOptions);
}
function swaggerLogger(logger) {
    const msg = `${app_constants_1.SwaggerConstants.logger} ${swagger_config_1.SWAGGER_CONFIG.url}`;
    return logger.log(msg);
}
//# sourceMappingURL=swagger.js.map