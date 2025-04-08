import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { MongooseError } from 'mongoose';
import { MulterError } from 'multer';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Check for ENOENT (File Not Found Error)
    if (exception.code === 'ENOENT') {
      this.logger.error(
        `File Not Found: ${exception.path} | Method: ${request.method} | URL: ${request.url}`,
      );
      return response.status(404).json({
        statusCode: 404,
        message: 'Requested file not found.',
        timestamp: new Date().toISOString(),
      });
    }

    // Check for Multer file upload errors
    if (exception instanceof MulterError) {
      this.logger.error(
        `File Upload Error: ${exception.message} | Method: ${request.method} | URL: ${request.url}`,
      );
      return response.status(400).json({
        statusCode: 400,
        message: `File upload error: ${exception.message}`,
        timestamp: new Date().toISOString(),
      });
    }

    // Handle Bad Request Exception
    if (exception instanceof BadRequestException) {
      const status = exception.getStatus();
      const message = this.getMessage(exception);

      this.logger.error(
        `Status: ${status} | Method: ${request.method} | URL: ${request.url} | Error: ${message}`,
        exception.stack,
      );

      return response.status(status).json({
        statusCode: status,
        message,
        timestamp: new Date().toISOString(),
      });
    }

    // Handle Mongoose Errors
    if (exception instanceof MongooseError) {
      this.logger.error(
        `Mongoose Error: ${exception.message} | Method: ${request.method} | URL: ${request.url}`,
      );
      return response.status(400).json({
        statusCode: 400,
        message: 'Database error occurred.',
        timestamp: new Date().toISOString(),
      });
    }

    // Default Handler for Other Exceptions
    const status = exception.getStatus ? exception.getStatus() : 500;
    const message = this.getMessage(exception);

    this.logger.error(
      `Status: ${status} | Method: ${request.method} | URL: ${request.url} | Error: ${message}`,
      exception.stack,
    );

    return response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
    });
  }

  private getMessage(exception: HttpException): string {
    const response = exception.getResponse
      ? exception.getResponse()
      : 'An unexpected error occurred.';

    if (typeof response === 'string') {
      return response;
    }

    if (typeof response === 'object' && response['message']) {
      return Array.isArray(response['message'])
        ? response['message'].join(', ')
        : response['message'];
    }

    return 'An unexpected error occurred.';
  }
}
