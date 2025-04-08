import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';

export interface StockRequest {
  id: string;
}

export interface StockIdsRequest {
  ids: string[];
}

export interface StockStatusRequest {
  status: boolean;
}

export interface Stock {
  id: string;
  designation: string;
  status: boolean;
  description: string;
}

export interface StockResponse {
  stock?: Stock;
}

export interface StockListResponse {
  stocks: Stock[];
}

export interface StoreServiceClient {
  getStockById(
    request: StockRequest,
    metadata?: Metadata,
  ): Observable<StockResponse>;
  getStores(
    request: StockIdsRequest,
    metadata?: Metadata,
  ): Observable<StockListResponse>;
  getStocksByStatus(
    request: StockStatusRequest,
    metadata?: Metadata,
  ): Observable<StockListResponse>;
}
