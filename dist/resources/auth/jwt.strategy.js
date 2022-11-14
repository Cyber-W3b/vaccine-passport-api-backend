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
exports.JwtStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const keypair_module_1 = require("../../lib/keypair/keypair.module");
const prisma_service_1 = require("../../prisma.service");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(prisma) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: keypair_module_1.KeypairModule.getKeyPair().private,
            passReqToCallback: true,
        });
        this.prisma = prisma;
    }
    async validate(request, payload) {
        if (isNaN(payload.sub)) {
            throw new common_1.UnauthorizedException();
        }
        const user = await this.prisma.user.findUnique({
            where: {
                wallet: payload.sub,
            },
        });
        const token_header = request.headers.authorization.split(' ')[1];
        const token = await this.prisma.tokensInvalidos.findUnique({
            where: {
                token: token_header,
            },
        });
        if (!user ||
            token) {
            throw new common_1.UnauthorizedException();
        }
        return {
            data: user,
            payload: payload,
            token: token_header,
        };
    }
};
JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;
//# sourceMappingURL=jwt.strategy.js.map