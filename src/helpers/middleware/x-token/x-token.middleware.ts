import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class XTokenMiddleware implements NestMiddleware {
  private readonly logger = new Logger(XTokenMiddleware.name);

  async use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key'];
    const authServer = process.env.KEYCLOAK_SERVER_URL;
    const realmName = process.env.KEYCLOAK_REALM;

    if (!apiKey) {
      this.logger.warn('Missing x-api-key header');
      throw new HttpException(
        'x-api-key header is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!authServer || !realmName) {
      this.logger.error('KEYCLOAK_SERVER_URL or KEYCLOAK_REALM is not defined');
      throw new HttpException(
        'Internal configuration error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const validationUrl = `${authServer}/realms/${realmName}/check?apiKey=${apiKey}`;

    try {
      const response = await axios.get(validationUrl);

      if (response.status === 200) {
        this.logger.debug('API key validated successfully');
        return next();
      }

      this.logger.warn(
        `Unexpected response from auth server: ${response.status}`,
      );
      throw new HttpException(
        'Unexpected response from authorization server',
        HttpStatus.FORBIDDEN,
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;

        if (axiosError.response) {
          const { status, data } = axiosError.response;
          this.logger.warn(
            `Auth server responded with status ${status}: ${JSON.stringify(
              data,
            )}`,
          );

          if (status === 401) {
            throw new HttpException(
              'Unauthorized request',
              HttpStatus.UNAUTHORIZED,
            );
          }

          throw new HttpException(
            `Authorization failed with status ${status}`,
            HttpStatus.FORBIDDEN,
          );
        }

        this.logger.error('No response from authorization server');
        throw new HttpException(
          'Authorization server not reachable',
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      }

      this.logger.error(
        'Unknown error occurred during token validation',
        error,
      );
      throw new HttpException(
        'Internal server error during authorization',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
