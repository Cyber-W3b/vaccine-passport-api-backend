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
exports.GenerateNftImageDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class GenerateNftImageDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tipo da Vacina',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GenerateNftImageDto.prototype, "vaccineType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Dose da vacina- 1ª, 2ª, reforço...',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GenerateNftImageDto.prototype, "dosis", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Lote da vacina',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GenerateNftImageDto.prototype, "batch", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unidade da vacina',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GenerateNftImageDto.prototype, "unity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Data de aplicação da vacina - Formato: YYYY-MM-DD',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsISO8601)({ strict: true }),
    (0, class_validator_1.Length)(10, 10),
    __metadata("design:type", String)
], GenerateNftImageDto.prototype, "dateApplication", void 0);
exports.GenerateNftImageDto = GenerateNftImageDto;
//# sourceMappingURL=generate-nft-image.dto.js.map