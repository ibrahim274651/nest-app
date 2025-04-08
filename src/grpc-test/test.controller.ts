import { ApiConstants } from '@/app.constants';
import { ExternalGrpcApiService } from '@/grpc/external-grpc-api.service';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

const crud = ApiConstants.crud('Fiscal Year');

@ApiTags('Test for Grpc')
@Controller('grpc-test')
export class GrpcTestController {
  constructor(
    private readonly externalGrpcApiService: ExternalGrpcApiService,
  ) {}

  @Get('fiscal-year/:id')
  @ApiOperation({ summary: crud.findOne.summary })
  @ApiResponse({
    status: 200,
    description: crud.findOne.response200,
  })
  @ApiResponse({
    status: 404,
    description: crud.findOne.response404,
  })
  async getFiscalYear(@Param('id') id: string) {
    return this.externalGrpcApiService.checkFiscalYearExists(id);
  }
}
