import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { StockRequest, StockIdsRequest } from './types/stock';

@Controller()
export class ExternalGrpcApiController {
  // constructor(private readonly storesService: StoreService) {}
  // @GrpcMethod('StockService', 'GetStockById')
  // getStockById(request: StockRequest) {
  //   return this.storesService.getStoreById(request);
  // }
  // @GrpcMethod('StockService', 'GetStores')
  // findStores(request: StockIdsRequest) {
  //   return this.storesService.findStores(request);
  // }
}
