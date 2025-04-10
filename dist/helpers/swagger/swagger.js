"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerConfiguration = swaggerConfiguration;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("@nestjs/config");
const swagger_config_1 = require("./swagger.config");
const swagger_custom_options_1 = require("./swagger-custom-options");
function swaggerConfiguration(app) {
    const logger = new common_1.Logger('SwaggerSetup');
    const configService = app.get(config_1.ConfigService);
    const SWAGGER_CONFIG = (0, swagger_config_1.createSwaggerConfig)(configService);
    try {
        const builder = new swagger_1.DocumentBuilder()
            .setTitle(SWAGGER_CONFIG.info.title)
            .setDescription(SWAGGER_CONFIG.info.description)
            .setVersion(SWAGGER_CONFIG.info.version)
            .setTermsOfService(SWAGGER_CONFIG.info.termsOfService ?? '')
            .addServer(SWAGGER_CONFIG.url, SWAGGER_CONFIG.serverDescription)
            .addServer(configService.get('SERVER_URL_PRODUCTION') || 'http://localhost:3000', 'Production environment')
            .addBearerAuth({
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
        }, 'authorization')
            .addApiKey({
            type: 'apiKey',
            in: 'header',
            name: 'x-api-key',
        }, 'x-api-key')
            .addGlobalParameters({
            name: 'tenantId',
            in: 'header',
            required: false,
            description: 'Tenant ID for multi-tenant applications',
            schema: {
                type: 'string',
            },
        });
        const options = builder.build();
        const document = swagger_1.SwaggerModule.createDocument(app, options);
        const customOptions = (0, swagger_custom_options_1.getCustomSwaggerOptions)(app);
        swagger_1.SwaggerModule.setup(SWAGGER_CONFIG.path, app, document, customOptions);
        logger.log(`Swagger docs available at ${SWAGGER_CONFIG.url}`);
    }
    catch (error) {
        logger.error('Failed to set up Swagger documentation', error);
    }
}
//# sourceMappingURL=swagger.js.map