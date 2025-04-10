export declare const SwaggerConstants: {
    title: string;
    customTitle: string;
    termsOfService: string;
    description: string;
};
export declare const ApiHelperConstants: {
    crud: (entityName: string, relatedEntity?: string) => {
        auth: {
            login: {
                summary: string;
                response200: string;
                response401: string;
            };
            logout: {
                summary: string;
                response200: string;
            };
            refresh: {
                summary: string;
                response200: string;
            };
        };
        create: {
            summary: string;
            bodyDescription: string;
            response201: string;
            response400: string;
        };
        findAll: {
            summary: string;
            summaryListAll: string;
            summaryListByRelatedEntity: string | undefined;
            response200: string;
            response400: string;
        };
        findOne: {
            summary: string;
            response200: string;
            response404: string;
        };
        update: {
            summary: string;
            bodyDescription: string;
            response200: string;
            response400: string;
            response404: string;
        };
        remove: {
            summary: string;
            response204: string;
            response404: string;
        };
        bulkCreate: {
            summary: string;
            description: string;
            response201: string;
            response400: string;
        };
        bulkDelete: {
            summary: string;
            description: string;
            response204: string;
        };
        softDelete: {
            summary: string;
            response204: string;
        };
        dropdown: {
            summary: string;
            description: string;
            response200: string;
        };
        dropdownByRelation: {
            summary: string;
            description: string;
            response200: string;
            response400: string;
            response404: string;
        } | undefined;
        assign: {
            summary: string;
            description: string;
            response200: string;
            response400: string;
        } | undefined;
        revoke: {
            summary: string;
            description: string;
            response200: string;
            response400: string;
            response404: string;
        } | undefined;
        summaryCustom: string | undefined;
        descriptionCustom: string | undefined;
    };
};
