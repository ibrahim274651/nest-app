"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenusController = void 0;
const common_1 = require("@nestjs/common");
const create_menu_dto_1 = require("./dto/create-menu.dto");
const update_menu_dto_1 = require("./dto/update-menu.dto");
const swagger_1 = require("@nestjs/swagger");
const page_options_dto_1 = require("src/helpers/page-options-dto/page-options-dto");
const menus_service_1 = require("./menus.service");
const filter_dto_1 = require("src/common/filter/filter.dto");
let MenusController = class MenusController {
    menuService;
    constructor(menuService) {
        this.menuService = menuService;
    }
    create(createMenuDto) {
        return this.menuService.create(createMenuDto);
    }
    findAll(pageOptionsDto, filterFundDto) {
        return this.menuService.findAll(filterFundDto, pageOptionsDto);
    }
    findOne(id) {
        return this.menuService.findOne(id);
    }
    update(id, updateMenuDto) {
        return this.menuService.update(id, updateMenuDto);
    }
    remove(id) {
        return this.menuService.remove(id);
    }
};
exports.MenusController = MenusController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new Menu' }),
    (0, swagger_1.ApiBody)({
        description: 'Details of the menu to create',
        type: create_menu_dto_1.CreateMenuDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_menu_dto_1.CreateMenuDto]),
    __metadata("design:returntype", void 0)
], MenusController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve all Menus with pagination' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof page_options_dto_1.PageOptionsDto !== "undefined" && page_options_dto_1.PageOptionsDto) === "function" ? _a : Object, typeof (_b = typeof filter_dto_1.FilterFundDto !== "undefined" && filter_dto_1.FilterFundDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], MenusController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific Menu by its ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MenusController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a specific Menu by its ID' }),
    (0, swagger_1.ApiBody)({
        description: 'Updated details of the menu',
        type: update_menu_dto_1.UpdateMenuDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_menu_dto_1.UpdateMenuDto]),
    __metadata("design:returntype", void 0)
], MenusController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a specific Menu by its ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MenusController.prototype, "remove", null);
exports.MenusController = MenusController = __decorate([
    (0, swagger_1.ApiTags)('Gestion menus'),
    (0, common_1.Controller)('menu'),
    __metadata("design:paramtypes", [menus_service_1.MenusService])
], MenusController);
//# sourceMappingURL=menus.controller.js.map