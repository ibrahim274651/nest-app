import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class GrpcTestService {
  private logger = new Logger(GrpcTestService.name);
  private fiscalYearService: FiscalYearService;

  constructor(
    @Inject('PARAMETER_SERVICE_PACKAGE') private client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.fiscalYearService =
      this.client.getService<FiscalYearService>('ParameterService');
    console.log('External Grpc Api service Initialized');
  }

  async getFiscalYearData(_id: string) {
    const response = await this.fiscalYearService
      .getFiscalYear({ _id })
      .toPromise();
    console.log('Fetched fiscal year:', response);
    return response;
  }
}
