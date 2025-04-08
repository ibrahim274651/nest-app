"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiConstants = exports.SwaggerConstants = void 0;
exports.SwaggerConstants = {
    title: 'Gestion des stocks',
    customTitle: 'Gestion des stocks',
    termsOfService: "La gestion des stocks désigne l'ensemble des processus et des pratiques permettant de superviser et de contrôler l'inventaire des biens ou des matériaux d'une entreprise.",
    description: "La gestion des stocks désigne l'ensemble des processus et des pratiques permettant de superviser et de contrôler l'inventaire des biens ou des matériaux d'une entreprise. C'est un aspect crucial pour assurer un équilibre entre l'offre et la demande, tout en minimisant les coûts associés à la détention de stocks.",
    logger: 'Stock management is running on',
};
exports.ApiConstants = {
    crud: (entityName, any) => {
        return {
            create: {
                summary: `Create a new ${entityName}`,
                bodyDescription: `Provide ${entityName} details to create a new ${entityName} record.`,
                response201: `The ${entityName} has been successfully created.`,
                response400: `Invalid data provided for creating a ${entityName}.`,
            },
            findAll: {
                summary: `Retrieve all ${entityName}s with pagination`,
                summary_withoutPagination: `Retrieve all ${entityName}(s) without pagination`,
                summary_withOtherEntity: `Retrieve all ${entityName} details for a specific ${any}.`,
                summary_any: `${any}.`,
                response200: `List of ${entityName}s retrieved successfully.`,
                response400: `Invalid pagination parameters provided.`,
            },
            findOne: {
                summary: `Retrieve a specific ${entityName} by its ID`,
                response200: `The ${entityName} details were retrieved successfully.`,
                response404: `The ${entityName} with the given ID was not found.`,
            },
            update: {
                summary: `Update a specific ${entityName} by its ID`,
                bodyDescription: `Provide updated details for the ${entityName}.`,
                response200: `The ${entityName} has been successfully updated.`,
                response400: `Invalid data provided for updating the ${entityName}.`,
                response404: `The ${entityName} with the given ID was not found.`,
            },
            remove: {
                summary: `Delete a specific ${entityName} by its ID`,
                response204: `The ${entityName} has been successfully deleted.`,
                response404: `The ${entityName} with the given ID was not found.`,
            },
            bulkCreate: {
                summary: `Create multiple ${entityName}s in a single request.`,
                description: `Provide an array of ${entityName} objects to create them in bulk.`,
                response201: `The ${entityName}s have been successfully created.`,
                response400: `Invalid data provided for creating multiple ${entityName}s.`,
            },
            bulkDelete: {
                summary: `Delete multiple ${entityName}s by their IDs`,
                description: `Provide an array of IDs to delete multiple records.`,
                response204: `The specified ${entityName}s were successfully deleted.`,
            },
            softDelete: {
                summary: `Mark a specific ${entityName} as inactive instead of permanently deleting it.`,
                response204: `The ${entityName} was successfully marked as inactive.`,
            },
            summary: `${any}`,
            description: `${any}`,
        };
    },
};
//# sourceMappingURL=app.constants.js.map