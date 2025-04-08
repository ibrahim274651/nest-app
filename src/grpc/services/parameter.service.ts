import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import moment from 'moment';

@Injectable()
export class ParameterService implements OnModuleInit {
  private readonly logger = new Logger(ParameterService.name);
  private fiscalYearService: FiscalYearService;

  constructor(
    @Inject('PARAMETER_SERVICE_PACKAGE') private client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.fiscalYearService =
      this.client.getService<FiscalYearService>('ParameterService');
  }

  async checkFiscalYearExists(_id: string) {
    try {
      const response: FiscalYearResponse = await this.fiscalYearService
        .getFiscalYear({ _id })
        .toPromise();

      if (!response || !response._id) {
        throw new NotFoundException(MESSAGES.FISCAL.invalidId);
      }

      this.logger.log('Fetched fiscal year:', response);
      return response;
    } catch (error) {
      this.logger.error('Error fetching fiscal year:', error.message);

      if (error.code === 5) {
        throw new NotFoundException(MESSAGES.FISCAL.invalidId);
      }

      throw error;
    }
  }

  validateDateWithinFiscalYear(
    startDate: string,
    endDate: string,
    checkDate: string,
  ) {
    const start = moment(startDate);
    const end = moment(endDate);
    const target = moment(checkDate);

    if (!target.isBetween(start, end, undefined, '[]')) {
      const errorMessage = MESSAGES.FISCAL.inUsed
        .replace('{checkDate}', checkDate)
        .replace('{startDate}', startDate)
        .replace('{endDate}', endDate);

      throw new BadRequestException(errorMessage);
    }
  }

  async getFiscalYearData(_id: string, checkDate: string) {
    const fiscalYear = await this.checkFiscalYearExists(_id);
    this.validateDateWithinFiscalYear(
      fiscalYear.startDate,
      fiscalYear.endDate,
      checkDate,
    );
    return fiscalYear;
  }
}

export const MESSAGES = {
  FISCAL: {
    invalidId: 'Fiscal year not found. It should be configured first.',
    inUsed:
      'The provided date ({checkDate}) is outside the fiscal year range ({startDate} - {endDate}).',
  },
};
