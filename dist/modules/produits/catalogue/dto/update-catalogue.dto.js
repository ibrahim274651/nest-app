"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCatalogueDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_catalogue_dto_1 = require("./create-catalogue.dto");
class UpdateCatalogueDto extends (0, swagger_1.PartialType)(create_catalogue_dto_1.CreateCatalogueDto) {
}
exports.UpdateCatalogueDto = UpdateCatalogueDto;
//# sourceMappingURL=update-catalogue.dto.js.map