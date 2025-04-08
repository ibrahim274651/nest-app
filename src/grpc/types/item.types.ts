import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';
import { ICatalog, ITarification, IFabrication, IUnite } from './common.types';

export interface ItemRequest {
  _id: string;
}

export interface ItemListResponse {
  items: Item[];
}

export interface ItemResponse {
  item: Item;
}

export interface Item {
  _id: string;
  reference: string;
  categorieId: string;
  designation: string;
  seuilMinimum: number;
  codeBarre: string;
  catalogue: ICatalog;
  accompagnementIds: string[];
  tarification: ITarification[];
  cuisson: boolean;
  gererStockProduit: boolean;
  visibleCaisse: boolean;
  fabrication: IFabrication[];
  articleGeneric: boolean;
  uniteDetails: IUnite;
}

export interface ItemServiceClient {
  findItemById(
    request: ItemRequest,
    metadata?: Metadata,
  ): Observable<ItemResponse>;
  findItems(metadata?: Metadata): Observable<ItemListResponse>;
}
