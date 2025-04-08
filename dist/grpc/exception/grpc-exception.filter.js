"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrpcExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const grpc_js_1 = require("@grpc/grpc-js");
const rxjs_1 = require("rxjs");
let GrpcExceptionFilter = class GrpcExceptionFilter {
    catch(exception, host) {
        console.error(' Erreur interceptée :', exception);
        return (0, rxjs_1.throwError)(() => {
            if (exception.code !== undefined) {
                switch (exception.code) {
                    case grpc_js_1.status.OK:
                        return new microservices_1.RpcException({ code: grpc_js_1.status.OK, message: 'Succès' });
                    case grpc_js_1.status.CANCELLED:
                        return new microservices_1.RpcException({
                            code: grpc_js_1.status.CANCELLED,
                            message: 'Requête annulée par le client.',
                        });
                    case grpc_js_1.status.UNKNOWN:
                        return new microservices_1.RpcException({
                            code: grpc_js_1.status.UNKNOWN,
                            message: 'Une erreur inconnue est survenue.',
                        });
                    case grpc_js_1.status.INVALID_ARGUMENT:
                        return new microservices_1.RpcException({
                            code: grpc_js_1.status.INVALID_ARGUMENT,
                            message: 'Argument invalide dans la requête.',
                        });
                    case grpc_js_1.status.DEADLINE_EXCEEDED:
                        return new microservices_1.RpcException({
                            code: grpc_js_1.status.DEADLINE_EXCEEDED,
                            message: 'Le délai de réponse a été dépassé.',
                        });
                    case grpc_js_1.status.NOT_FOUND:
                        return new microservices_1.RpcException({
                            code: grpc_js_1.status.NOT_FOUND,
                            message: 'Ressource demandée introuvable.',
                        });
                    case grpc_js_1.status.ALREADY_EXISTS:
                        return new microservices_1.RpcException({
                            code: grpc_js_1.status.ALREADY_EXISTS,
                            message: 'Cette ressource existe déjà.',
                        });
                    case grpc_js_1.status.PERMISSION_DENIED:
                        return new microservices_1.RpcException({
                            code: grpc_js_1.status.PERMISSION_DENIED,
                            message: 'Permission refusée.',
                        });
                    case grpc_js_1.status.UNAUTHENTICATED:
                        return new microservices_1.RpcException({
                            code: grpc_js_1.status.UNAUTHENTICATED,
                            message: 'Authentification requise.',
                        });
                    case grpc_js_1.status.RESOURCE_EXHAUSTED:
                        return new microservices_1.RpcException({
                            code: grpc_js_1.status.RESOURCE_EXHAUSTED,
                            message: 'Quota dépassé.',
                        });
                    case grpc_js_1.status.FAILED_PRECONDITION:
                        return new microservices_1.RpcException({
                            code: grpc_js_1.status.FAILED_PRECONDITION,
                            message: "État invalide pour l'opération demandée.",
                        });
                    case grpc_js_1.status.ABORTED:
                        return new microservices_1.RpcException({
                            code: grpc_js_1.status.ABORTED,
                            message: 'Opération interrompue.',
                        });
                    case grpc_js_1.status.OUT_OF_RANGE:
                        return new microservices_1.RpcException({
                            code: grpc_js_1.status.OUT_OF_RANGE,
                            message: 'Valeur en dehors de la plage autorisée.',
                        });
                    case grpc_js_1.status.UNIMPLEMENTED:
                        return new microservices_1.RpcException({
                            code: grpc_js_1.status.UNIMPLEMENTED,
                            message: 'Fonctionnalité non implémentée.',
                        });
                    case grpc_js_1.status.INTERNAL:
                        return new microservices_1.RpcException({
                            code: grpc_js_1.status.INTERNAL,
                            message: 'Erreur interne du serveur gRPC.',
                        });
                    case grpc_js_1.status.UNAVAILABLE:
                        return new microservices_1.RpcException({
                            code: grpc_js_1.status.UNAVAILABLE,
                            message: 'Le service gRPC distant est indisponible.',
                        });
                    case grpc_js_1.status.DATA_LOSS:
                        return new microservices_1.RpcException({
                            code: grpc_js_1.status.DATA_LOSS,
                            message: 'Perte de données irrécupérable.',
                        });
                    default:
                        return new microservices_1.RpcException({
                            code: grpc_js_1.status.UNKNOWN,
                            message: exception.message || 'Erreur inconnue',
                        });
                }
            }
            if (exception instanceof common_1.HttpException) {
                return new microservices_1.RpcException({
                    code: grpc_js_1.status.INVALID_ARGUMENT,
                    message: exception.message || 'Requête invalide.',
                });
            }
            if (exception instanceof Error) {
                return new microservices_1.RpcException({
                    code: grpc_js_1.status.INTERNAL,
                    message: exception.message || 'Erreur serveur.',
                });
            }
            if (exception.details) {
                return new microservices_1.RpcException({
                    code: grpc_js_1.status.INTERNAL,
                    message: exception.details,
                });
            }
            return new microservices_1.RpcException({
                code: grpc_js_1.status.INTERNAL,
                message: "Une erreur interne inattendue s'est produite.",
            });
        });
    }
};
exports.GrpcExceptionFilter = GrpcExceptionFilter;
exports.GrpcExceptionFilter = GrpcExceptionFilter = __decorate([
    (0, common_1.Catch)()
], GrpcExceptionFilter);
//# sourceMappingURL=grpc-exception.filter.js.map