"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCuissonDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_cuisson_dto_1 = require("./create-cuisson.dto");
class UpdateCuissonDto extends (0, mapped_types_1.PartialType)(create_cuisson_dto_1.CreateCuissonDto) {
}
exports.UpdateCuissonDto = UpdateCuissonDto;
//# sourceMappingURL=update-cuisson.dto.js.map