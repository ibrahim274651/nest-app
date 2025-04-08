import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
export declare class GlobalExceptionFilter implements ExceptionFilter {
    private readonly logger;
    catch(exception: any, host: ArgumentsHost): Response<any, Record<string, any>>;
    private getMessage;
}
