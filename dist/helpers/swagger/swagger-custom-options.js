"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomSwaggerOptions = getCustomSwaggerOptions;
const app_constants_1 = require("../../app.constants");
function getCustomSwaggerOptions(app) {
    return {
        customSiteTitle: app_constants_1.SwaggerConstants.customTitle,
        swaggerOptions: {
            docExpansion: 'list',
            defaultModelsExpandDepth: 1,
            defaultModelRendering: 'model',
            displayRequestDuration: true,
            filter: true,
            persistAuthorization: true,
            tryItOutEnabled: true,
            explore: true,
        },
    };
}
//# sourceMappingURL=swagger-custom-options.js.map