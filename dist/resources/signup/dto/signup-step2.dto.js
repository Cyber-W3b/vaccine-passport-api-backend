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
exports.SignupStep2Dto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const cpf_validator_decorator_1 = require("../../../lib/cpf.validator/cpf.validator.decorator");
class SignupStep2Dto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Carteira do usuário',
        required: true,
        type: 'string',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SignupStep2Dto.prototype, "wallet", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Número do cartão do SUS do usuário',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SignupStep2Dto.prototype, "susCardNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Número do COREN do usuário - se enfermeiro',
        required: false,
    }),
    __metadata("design:type", String)
], SignupStep2Dto.prototype, "corenNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Número do CPF do usuário',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, cpf_validator_decorator_1.CpfValid)(),
    __metadata("design:type", String)
], SignupStep2Dto.prototype, "cpf", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Número do CRM do usuário - se médico',
        required: false,
    }),
    __metadata("design:type", String)
], SignupStep2Dto.prototype, "crmNumber", void 0);
exports.SignupStep2Dto = SignupStep2Dto;
//# sourceMappingURL=signup-step2.dto.js.map