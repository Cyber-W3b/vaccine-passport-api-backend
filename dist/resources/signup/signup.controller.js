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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupController = void 0;
const common_1 = require("@nestjs/common");
const signup_service_1 = require("./signup.service");
const swagger_1 = require("@nestjs/swagger");
const signup_step1_dto_1 = require("./dto/signup-step1.dto");
const user_entity_1 = require("../../entities/user.entity");
const signup_step2_dto_1 = require("./dto/signup-step2.dto");
let SignupController = class SignupController {
    constructor(signupService) {
        this.signupService = signupService;
    }
    async signupStep1(body) {
        const userByEmail = await this.signupService.getUserByEmail(body.email);
        const userByWallet = await this.signupService.getUserByWallet(body.wallet);
        if (userByEmail || userByWallet) {
            if (userByWallet && userByWallet.completed === false) {
                return userByWallet;
            }
            if (userByEmail && userByEmail.completed === false) {
                return userByEmail;
            }
            return new common_1.HttpException('Wallet ou e-mail já cadastrados', 409);
        }
        return this.signupService.signupStep1(body);
    }
    async signupStep2(body) {
        const user = await this.signupService.getUserByWallet(body.wallet);
        if (!user) {
            return new common_1.HttpException('Usuário com a Wallet inexistente', 404);
        }
        if (user.completed) {
            return new common_1.HttpException('Usuário já cadastrado', 409);
        }
        const userByCpf = await this.signupService.getUserByCpf(body.cpf);
        if (userByCpf) {
            return new common_1.HttpException('CPF já cadastrado', 409);
        }
        return this.signupService.signupStep2(body);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Step 1 - Cria um novo usuário pendente de cadastro',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Usuário pendente de cadastro criado com êxito. Ou usuário existe, mas ainda está pendente de cadastro.',
        type: user_entity_1.User,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Dados de cadastro inválidos',
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Wallet ou e-mail já cadastrados e já completaram o cadastro.',
    }),
    (0, common_1.Post)('step1'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_step1_dto_1.SignupStep1Dto]),
    __metadata("design:returntype", Promise)
], SignupController.prototype, "signupStep1", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Step 2 - Finaliza o cadastro de um usuário',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Usuário atualizado com êxito - podendo fazer login depois',
        type: user_entity_1.User,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Dados de cadastro inválidos',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Usuário com a Wallet inexistente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Usuário já tem cadastro completo ou já existe um cadastro com mesmo CPF',
    }),
    (0, common_1.Post)('step2'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_step2_dto_1.SignupStep2Dto]),
    __metadata("design:returntype", Promise)
], SignupController.prototype, "signupStep2", null);
SignupController = __decorate([
    (0, common_1.Controller)('signup'),
    (0, swagger_1.ApiTags)('Cadastro'),
    __metadata("design:paramtypes", [signup_service_1.SignupService])
], SignupController);
exports.SignupController = SignupController;
//# sourceMappingURL=signup.controller.js.map