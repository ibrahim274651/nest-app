"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiHelperConstants = exports.SwaggerConstants = void 0;
exports.SwaggerConstants = {
    title: 'Gestion des articles - Resto-Bar',
    customTitle: 'Gestion des articles - Resto-Bar',
    termsOfService: "La gestion des articles dans un resto-bar englobe l'ensemble des pratiques visant à organiser, suivre et optimiser les produits alimentaires, boissons et fournitures nécessaires à l'activité quotidienne.",
    description: 'Ce module permet une gestion efficace des articles dans un environnement de restauration-bar, incluant le suivi la catégorisation des produits.',
};
exports.ApiHelperConstants = {
    crud: (entityName, relatedEntity) => {
        return {
            auth: {
                login: {
                    summary: `Authenticate user and retrieve access token`,
                    response200: `User authenticated successfully.`,
                    response401: `Invalid credentials.`,
                },
                logout: {
                    summary: `Invalidate current user session/token`,
                    response200: `User logged out successfully.`,
                },
                refresh: {
                    summary: `Refresh the access token using a refresh token`,
                    response200: `New access token generated.`,
                },
            },
            create: {
                summary: `Create a new ${entityName}`,
                bodyDescription: `Provide ${entityName} details to create a new ${entityName} record.`,
                response201: `The ${entityName} has been successfully created.`,
                response400: `Invalid data provided for creating a ${entityName}.`,
            },
            findAll: {
                summary: `Retrieve all ${entityName}s with pagination`,
                summaryListAll: `Retrieve all ${entityName}(s) without pagination`,
                summaryListByRelatedEntity: relatedEntity
                    ? `Retrieve all ${entityName} details for a specific ${relatedEntity}.`
                    : undefined,
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
            dropdown: {
                summary: `Get dropdown list of ${entityName}s`,
                description: `Returns a minimal list of ${entityName}s (e.g., id and name) to be used in dropdown menus.`,
                response200: `Dropdown list of ${entityName}s retrieved successfully.`,
            },
            dropdownByRelation: relatedEntity
                ? {
                    summary: `Get ${entityName}s related to a specific ${relatedEntity}`,
                    description: `Returns a filtered dropdown list of ${entityName}s that are associated with a given ${relatedEntity}.`,
                    response200: `Filtered dropdown list of ${entityName}s for the given ${relatedEntity} retrieved successfully.`,
                    response400: `Invalid ${relatedEntity} ID provided.`,
                    response404: `${relatedEntity} not found.`,
                }
                : undefined,
            assign: relatedEntity
                ? {
                    summary: `Assign a ${relatedEntity} to a ${entityName}`,
                    description: `Establish a relationship between ${entityName} and ${relatedEntity}.`,
                    response200: `${relatedEntity} was successfully assigned to ${entityName}.`,
                    response400: `Invalid assignment request.`,
                }
                : undefined,
            revoke: relatedEntity
                ? {
                    summary: `Revoke a ${relatedEntity} from a ${entityName}`,
                    description: `Remove the relationship between ${entityName} and ${relatedEntity}.`,
                    response200: `${relatedEntity} was successfully revoked from ${entityName}.`,
                    response400: `Invalid revocation request.`,
                    response404: `${relatedEntity} not found or not linked to ${entityName}.`,
                }
                : undefined,
            summaryCustom: relatedEntity,
            descriptionCustom: relatedEntity,
        };
    },
};
//# sourceMappingURL=app.constants.js.map