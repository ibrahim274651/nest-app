import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class MigrationMiddleware implements NestMiddleware {
  private readonly logger = new Logger(MigrationMiddleware.name);

  private readonly reservedChars = /[()[\]?+!]/;

  use(req: Request, res: Response, next: NextFunction): void {
    const { originalUrl } = req;

    // Validate route patterns
    this.checkWildcardSyntax(originalUrl);
    this.checkOptionalSyntax(originalUrl);
    this.checkReservedChars(originalUrl);

    next();
  }

  private checkWildcardSyntax(url: string): void {
    if (/\/(\*|{\*[^}]+})/.test(url)) {
      this.logger.warn(`Wildcard pattern detected: ${url}`);
      this.logger.debug(
        'Express v5 requires named wildcards (e.g., /users/*path)',
      );
    }
  }

  private checkOptionalSyntax(url: string): void {
    if (/\?.+$/.test(url)) {
      this.logger.warn(`Optional parameter syntax detected: ${url}`);
      this.logger.debug(
        'Replace ? with braces: /file{.:ext} instead of /file.:ext?',
      );
    }
  }

  private checkReservedChars(url: string): void {
    const hasUnescapedChars =
      this.reservedChars.test(url) && !/\\[()[\]?+!]/.test(url);

    if (hasUnescapedChars) {
      this.logger.warn(`Unescaped reserved characters in: ${url}`);
      this.logger.debug(
        'Escape reserved characters with \\ (e.g., \\[section\\])',
      );
    }
  }
}
