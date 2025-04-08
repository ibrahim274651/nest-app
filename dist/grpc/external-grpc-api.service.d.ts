import { OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
export declare class ExternalGrpcApiService implements OnModuleInit {
    private client;
    private readonly logger;
    private fiscalYearService;
    constructor(client: ClientGrpc);
    onModuleInit(): void;
    checkFiscalYearExists(_id: string): Promise<FiscalYearResponse>;
    validateDateWithinFiscalYear(startDate: string, endDate: string, checkDate: string): void;
    getFiscalYearData(_id: string, checkDate: string): Promise<FiscalYearResponse>;
}
export declare const MESSAGES: {
    FISCAL: {
        invalidId: string;
        inUsed: string;
    };
};
