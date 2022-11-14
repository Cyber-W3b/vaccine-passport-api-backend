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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
const mailer_1 = require("@nestjs-modules/mailer");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(prisma, mailerService, jwtService) {
        this.prisma = prisma;
        this.mailerService = mailerService;
        this.jwtService = jwtService;
    }
    async step1(cpf) {
        const user = await this.prisma.user.findFirstOrThrow({
            where: {
                cpf,
            },
        });
        const token = Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
        await this.prisma.tokenEmail.create({
            data: {
                token,
                cpf,
            },
        });
        await this.mailerService.sendMail({
            to: user.email,
            subject: 'Seu login no sistema - Passport',
            html: `
        <p>Olá ${user.name}</p>
        <p>Para acessar sua conta, clique no link abaixo:</p>
        <a href="${process.env.FRONT_LOGIN_URL}/${token}">Acessar minha conta</a>
        <p>Se não for você, por favor desconsidere a esse e-mail.</p>`,
        });
        return true;
    }
    async step2(dto) {
        const token = await this.prisma.tokenEmail.findFirst({
            where: {
                token: dto.token,
            },
        });
        if (!token) {
            throw new common_1.NotFoundException('Token não encontrado');
        }
        const user = await this.prisma.user.findFirstOrThrow({
            where: {
                cpf: token.cpf,
            },
        });
        return {
            token: this.jwtService.sign({
                sub: user.wallet,
            }),
            user: user,
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        mailer_1.MailerService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map