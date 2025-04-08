import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
export declare class AppHelperService {
    private readonly jwtService;
    private readonly logger;
    private defaultPrefix;
    private defaultLength;
    private ipAddress;
    private port;
    private baseUrl;
    constructor(jwtService: JwtService);
    extractTokenFromRequest(request: Request): string;
    extractUserIdFromToken(request: Request): string;
    decodeAccessToken(request: Request): {
        userId: any;
        name: any;
        email: any;
        username: any;
        givenName: any;
        familyName: any;
        roles: any;
    };
    generateReferenceNumber(prefix?: string, length?: number): string;
    generateRandomNumber(length: number): string;
    dateFromDay(date: Date, days: number): string;
    formatImagesUploadUrl: (results: any[]) => any[];
    formatImageUrl: (result: any) => any;
    singleImageUrl: (results: any[]) => any[];
    mapCatalogResponseWithImageUrl: (results: any) => any;
    sanitizeCatalogDataBeforeSave: (data: any) => any;
    removeImageUrl(data: any, imageUrl: string): Promise<string>;
}
export declare const codeGenerate: () => string;
export declare const getServerIp: () => string;
export declare function formatDate(date: string): string;
