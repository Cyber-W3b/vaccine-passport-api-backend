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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const signup_service_1 = require("../signup/signup.service");
const swagger_1 = require("@nestjs/swagger");
const login_step1_dto_1 = require("./dto/login.step1.dto");
let AuthController = class AuthController {
    constructor(authService, signupService) {
        this.authService = authService;
        this.signupService = signupService;
    }
    async step1(dto) {
        const userByCpf = await this.signupService.getUserByCpf(dto.cpf);
        if (!userByCpf) {
            throw new common_1.NotFoundException('CPF não encontrado');
        }
        await this.authService.step1(dto.cpf);
        return {
            status: true,
            message: 'Link mágico enviado por e-mail do usuário',
        };
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Step 1 - Verifica se o CPF está cadastrado e envia um e-mail para o usuário para verificação',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Link mágico enviado por e-mail do usuário',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Requisição inválida',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'CPF não encontrado',
    }),
    (0, common_1.Post)('step1'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_step1_dto_1.LoginStep1Dto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "step1", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    (0, swagger_1.ApiTags)('Login'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        signup_service_1.SignupService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map