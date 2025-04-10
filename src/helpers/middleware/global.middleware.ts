import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class GlobalMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`[Global Middleware] ${req.method} ${req.originalUrl}`);
    res.setHeader('X-Powered-By', 'NestJS');

    next();
  }
}
