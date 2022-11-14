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
exports.User = void 0;
const swagger_1 = require("@nestjs/swagger");
class User {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nome do usuário',
        required: true,
        type: 'string',
    }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email do usuário',
        required: true,
        type: 'string',
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Carteira do usuário',
        required: true,
        type: 'string',
    }),
    __metadata("design:type", String)
], User.prototype, "wallet", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Número do cartão do SUS do usuário',
        required: false,
    }),
    __metadata("design:type", String)
], User.prototype, "susCardNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Número do COREN do usuário - se enfermeiro',
        required: false,
    }),
    __metadata("design:type", String)
], User.prototype, "corenNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Número do CRM do usuário - se médico',
        required: false,
    }),
    __metadata("design:type", String)
], User.prototype, "crmNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Número do CPF do usuário',
        required: true,
    }),
    __metadata("design:type", String)
], User.prototype, "cpf", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Flag que indica se o cadastro do usuário está completo',
        required: true,
    }),
    __metadata("design:type", Boolean)
], User.prototype, "completed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Data de cadastro do usuário',
    }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Data de atualização do usuário',
    }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
exports.User = User;
//# sourceMappingURL=user.entity.js.map