import { ExternalGrpcApiService } from '@/grpc/external-grpc-api.service';
export declare class GrpcTestController {
    private readonly externalGrpcApiService;
    constructor(externalGrpcApiService: ExternalGrpcApiService);
    getFiscalYear(id: string): Promise<any>;
}
