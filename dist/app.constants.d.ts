export declare const SwaggerConstants: {
    title: string;
    customTitle: string;
    termsOfService: string;
    description: string;
    logger: string;
};
export declare const ApiConstants: {
    crud: (entityName: string, any?: string) => {
        create: {
            summary: string;
            bodyDescription: string;
            response201: string;
            response400: string;
        };
        findAll: {
            summary: string;
            summary_withoutPagination: string;
            summary_withOtherEntity: string;
            summary_any: string;
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
        summary: string;
        description: string;
    };
};
