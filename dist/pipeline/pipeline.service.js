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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PipelineService = void 0;
const common_1 = require("@nestjs/common");
let PipelineService = class PipelineService {
    constructor() { }
    lookupStage(options, from) {
        console.log('Generated Lookup Options:', JSON.stringify(options, null, 2));
        const lookup = { from, as: options.as };
        if (options.pipeline) {
            lookup.pipeline = options.pipeline;
            if (options.let) {
                lookup.let = options.let;
            }
        }
        else {
            lookup.localField = options.localField;
            lookup.foreignField = options.foreignField;
        }
        return { $lookup: lookup };
    }
    unwindStage(as, preserve = false) {
        return {
            $unwind: {
                path: `$${as}`,
                preserveNullAndEmptyArrays: preserve,
            },
        };
    }
    generatePipeline(model, options) {
        const shouldUnwind = options.unwind ?? true;
        const preserve = options.preserve ?? false;
        const pipeline = [this.lookupStage(options, model.collection.name)];
        if (shouldUnwind) {
            pipeline.push(this.unwindStage(options.as, preserve));
        }
        return pipeline;
    }
};
exports.PipelineService = PipelineService;
exports.PipelineService = PipelineService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PipelineService);
//# sourceMappingURL=pipeline.service.js.map