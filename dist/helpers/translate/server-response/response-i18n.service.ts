import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { I18nPath } from '../generated/i18n.generated';
import { TranslateService } from '../translate.service';
import {
  OtherKeyUnion,
  EntityKey,
  FieldKey,
  ResponseData,
  ErrorParams,
  ApiResponse,
} from '../types/i18n.types';
import { PageDto } from 'src/helpers/page-dto/page-dto';
import { PageMetaDto } from 'src/helpers/page-meta-dto/page-meta-dto';
import { PageOptionsDto } from 'src/helpers/page-options-dto/page-options-dto';

const ERROR_KEYS = {
  NOT_FOUND: 'global.ERRORS.NOT_FOUND',
  INVALID_DATA: 'global.ERRORS.INVALID_DATA',
  CONFLICT: 'global.ERRORS.CONFLICT',
  VALIDATION: 'global.ERRORS.VALIDATION_ERROR',
  UNEXPECTED: 'global.ERRORS.VALIDATION_ERROR.UNEXPECTED',
  CONNECTION: 'global.ERRORS.CONNECTION',
  CONNECTION_RESET: 'global.ERRORS.CONNECTION_RESET',
  UNAUTHORIZED: 'global.ERRORS.UNAUTHORIZED',
  FORBIDDEN: 'global.ERRORS.FORBIDDEN',
  SERVICE_UNAVAILABLE: 'global.ERRORS.SERVICE_UNAVAILABLE',
  INVALID_ID: 'global.ERRORS.INVALID_ID',
} as const;

@Injectable()
export class ResponseI18nService {
  constructor(private readonly i18n: TranslateService) {}

  private translate(key: I18nPath, args: Record<string, any> = {}) {
    return this.i18n.translate(key, { args }) as string;
  }

  private getTranslatedEntity(key: EntityKey) {
    return this.translate(`collection.ENTITY.${key}` as I18nPath);
  }

  private getTranslatedField(key: FieldKey) {
    return this.translate(`collection.FIELD.${key}` as I18nPath);
  }

  private getOtherMessage(key: OtherKeyUnion, args: Record<string, any> = {}) {
    return this.translate(`otherMessage.${key}` as I18nPath, { args });
  }

  success<T>(data: T, entityKey: EntityKey): ResponseData<T> {
    const entity = this.getTranslatedEntity(entityKey);
    const message = this.translate('global.CRUD.READ.SUCCESS', { entity });
    return { statusCode: HttpStatus.OK, message, data };
  }

  fetchWithPagination<T>(
    data: T[],
    itemCount: number,
    pageOptionsDto: PageOptionsDto,
    entityKey: EntityKey,
  ): PageDto<T> {
    const hasData = data.length > 0;
    const entity = this.getTranslatedEntity(entityKey);

    const message = this.translate(
      hasData ? 'global.CRUD.READ.SUCCESS' : 'global.CRUD.READ.NOT_FOUND',
      { entity },
    );

    return {
      statusCode: hasData ? HttpStatus.OK : HttpStatus.NO_CONTENT,
      message: message,
      data,
      meta: new PageMetaDto({ pageOptionsDto, itemCount }),
    };
  }

  fetchAll<T>(data: T[], entityKey: EntityKey): ApiResponse<T> {
    const hasData = data.length > 0;
    const entity = this.getTranslatedEntity(entityKey);

    const message = this.translate(
      hasData ? 'global.CRUD.READ.SUCCESS' : 'global.CRUD.READ.NOT_FOUND',
      { entity },
    );

    return {
      statusCode: hasData ? HttpStatus.OK : HttpStatus.NO_CONTENT,
      message,
      count: data.length,
      data: hasData ? data : [],
    };
  }

  create<T>(data: T, entityKey: EntityKey): ResponseData<T> {
    const message = this.translate('global.CRUD.CREATE.SUCCESS', {
      entity: this.getTranslatedEntity(entityKey),
    });
    return { statusCode: HttpStatus.CREATED, message, data };
  }

  update<T>(data: T, entityKey: EntityKey): ResponseData<T> {
    const message = this.translate('global.CRUD.UPDATE.SUCCESS', {
      entity: this.getTranslatedEntity(entityKey),
    });
    return { statusCode: HttpStatus.OK, message, data };
  }

  delete<T>(data: T, entityKey: EntityKey): ResponseData<T> {
    const message = this.translate('global.CRUD.DELETE.SUCCESS', {
      entity: this.getTranslatedEntity(entityKey),
    });
    return { statusCode: HttpStatus.OK, message, data };
  }

  notFound(): ResponseData<null> {
    const message = this.translate(ERROR_KEYS.NOT_FOUND);
    return {
      statusCode: HttpStatus.NOT_FOUND,
      message,
      timestamp: new Date().toISOString(),
    };
  }

  notFoundData(entityKey: EntityKey): ResponseData<null> {
    const message = this.translate(ERROR_KEYS.INVALID_DATA, {
      entity: this.getTranslatedEntity(entityKey),
    });
    return {
      statusCode: HttpStatus.NOT_FOUND,
      message,
      data: null,
      timestamp: new Date().toISOString(),
    };
  }

  conflict(field: FieldKey, value: string): ResponseData<null> {
    const message = this.translate(ERROR_KEYS.CONFLICT, {
      field: this.getTranslatedField(field),
      value,
    });
    return {
      statusCode: HttpStatus.CONFLICT,
      message,
      timestamp: new Date().toISOString(),
    };
  }

  validationError({ key, fieldName }: ErrorParams) {
    const message = this.translate(
      `global.ERRORS.VALIDATION_ERROR.${key}` as I18nPath,
      {
        field: this.getTranslatedField(fieldName),
      },
    );
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      message,
    };
  }

  badRequest(
    key: OtherKeyUnion,
    args?: Record<string, any>,
  ): ResponseData<any> {
    const message = this.getOtherMessage(key, args || {});
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      message,
      timestamp: new Date().toISOString(),
    };
  }

  handleError = (error: {
    name?: string;
    code?: string | number;
    status?: number;
    message?: string;
    entity?: string;
    keyValue?: Record<string, any>;
    value?: string;
    kind?: string;
  }): never => {
    // Validation Error
    if (error.name === 'ValidationError') {
      const message = this.translate(ERROR_KEYS.VALIDATION, {
        message: error.message,
      });
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }

    // Mongo Duplicate Key Error
    if (error.code === 11000) {
      const keyValue = error.keyValue ?? {};
      const entries = Object.entries(keyValue) as [string, unknown][];

      let field = 'field';
      let value = 'value';

      if (entries.length > 0) {
        const [key, val] = entries[0];
        field = key;
        value = typeof val === 'string' ? val : JSON.stringify(val);
      }

      const message = this.translate(ERROR_KEYS.CONFLICT, {
        field: this.getTranslatedField(field as FieldKey),
        value,
      });

      throw new HttpException(message, HttpStatus.CONFLICT);
    }

    // Not Found
    if (
      error.status === HttpStatus.NOT_FOUND ||
      (typeof error.message === 'string' &&
        error.message.toLowerCase().includes('not found'))
    ) {
      const entity = error.entity || 'Resource';
      const message = this.translate(ERROR_KEYS.INVALID_DATA, { entity });
      throw new HttpException(message, HttpStatus.NOT_FOUND);
    }

    // Connection Reset
    if (String(error.code) === 'ECONNRESET') {
      const message = this.translate(ERROR_KEYS.CONNECTION_RESET);
      throw new HttpException(message, HttpStatus.SERVICE_UNAVAILABLE);
    }

    // Generic Service Unavailable
    if (error.status === HttpStatus.SERVICE_UNAVAILABLE) {
      const message = this.translate(ERROR_KEYS.SERVICE_UNAVAILABLE);
      throw new HttpException(message, HttpStatus.SERVICE_UNAVAILABLE);
    }

    // Mongo Connection Error
    if (['MongoNetworkError', 'MongoTimeoutError'].includes(error.name || '')) {
      const message = this.translate(ERROR_KEYS.CONNECTION);
      throw new HttpException(message, HttpStatus.SERVICE_UNAVAILABLE);
    }

    // Invalid Mongo ObjectId (CastError)
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      const message = this.translate(ERROR_KEYS.INVALID_ID, {
        id: error.value || 'unknown',
      });
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }

    // Unauthorized
    if (error.status === HttpStatus.UNAUTHORIZED) {
      const message = this.translate(ERROR_KEYS.UNAUTHORIZED);
      throw new HttpException(message, HttpStatus.UNAUTHORIZED);
    }

    // Forbidden
    if (error.status === HttpStatus.FORBIDDEN) {
      const message = this.translate(ERROR_KEYS.FORBIDDEN);
      throw new HttpException(message, HttpStatus.FORBIDDEN);
    }

    // Fallback
    const message = this.translate(ERROR_KEYS.UNEXPECTED, {
      message: error.message || 'Unknown error occurred',
    });

    throw new HttpException(
      message,
      error.status || HttpStatus.INTERNAL_SERVER_ERROR,
    );
  };
}
