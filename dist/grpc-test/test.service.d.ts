import { ClientGrpc } from '@nestjs/microservices';
export declare class GrpcTestService {
    private client;
    private logger;
    private fiscalYearService;
    constructor(client: ClientGrpc);
    onModuleInit(): void;
    getFiscalYearData(_id: string): Promise<any>;
}
