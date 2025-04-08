import { ArgumentsHost, RpcExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable } from 'rxjs';
export declare class GrpcExceptionFilter implements RpcExceptionFilter<RpcException> {
    catch(exception: any, host: ArgumentsHost): Observable<any>;
}
