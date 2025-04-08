import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ExternalGrpcApiService } from './external-grpc-api.service';
import { ExternalGrpcApiController } from './external-grpc-api.controller';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      // {
      //   name: 'ORDER_CLIENT',
      //   transport: Transport.GRPC,
      //   options: {
      // url: 'localhost:5000',
      //     package: 'order',
      //     protoPath: join(__dirname, 'proto/order.proto'),
      //   },
      // },
      {
        name: 'PARAMETER_SERVICE_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: 'localhost:50050',
          package: 'fiscalYear',
          protoPath: join(__dirname, 'proto/fiscalYear.proto'),
        },
      },
    ]),
  ],
  controllers: [ExternalGrpcApiController],
  providers: [ExternalGrpcApiService],
  exports: [ClientsModule, ExternalGrpcApiService],
})
export class GrpcApiModule {}
