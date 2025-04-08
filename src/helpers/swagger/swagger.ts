import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SWAGGER_CONFIG } from './swagger.config';
import { getCustomSwaggerOptions } from './swagger-custom-options';
import { SwaggerConstants } from '@/app.constants';

export function swaggerConfiguration(app: INestApplication) {
  const builder = new DocumentBuilder()
    .setTitle(SWAGGER_CONFIG.info.title)
    .setTermsOfService(SWAGGER_CONFIG.info.termsOfService)
    // .addTag(SWAGGER_CONFIG.info.tags[])
    .setDescription(SWAGGER_CONFIG.info.description)
    .setVersion(SWAGGER_CONFIG.info.version)
    .addServer(SWAGGER_CONFIG.url, SWAGGER_CONFIG.serverDescription)
    .addServer(
      process.env.SERVER_URL_PRODUCTION || 'http://default-production-url',
      'Productions environment',
    )
    .addServer(
      process.env.SERVER_URL || 'http://default-production-url',
      'Test environment',
    )
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'authorization',
    );
  // .addGlobalParameters({
  //   name: 'tenantId',
  //   in: 'header',
  // })
  const options = builder.build();
  const document = SwaggerModule.createDocument(app, options);

  // Get custom options
  const customOptions = getCustomSwaggerOptions(app);

  SwaggerModule.setup(SWAGGER_CONFIG.path, app, document, customOptions);
}

export function swaggerLogger(logger: any): string {
  const msg = `${SwaggerConstants.logger} ${SWAGGER_CONFIG.url}`;
  return logger.log(msg);
}
