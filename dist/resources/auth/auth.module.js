"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const prisma_service_1 = require("../../prisma.service");
const signup_service_1 = require("../signup/signup.service");
const mailer_1 = require("@nestjs-modules/mailer");
const config_1 = require("@nestjs/config");
const keypair_module_1 = require("../../lib/keypair/keypair.module");
const jwt_1 = require("@nestjs/jwt");
const jwt_strategy_1 = require("./jwt.strategy");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mailer_1.MailerModule.forRootAsync({
                imports: [
                    config_1.ConfigModule,
                    jwt_1.JwtModule.registerAsync({
                        useFactory: (config = process.env, keypair = keypair_module_1.KeypairModule.getKeyPair()) => {
                            return {
                                privateKey: keypair.private,
                                publicKey: keypair.public,
                                signOptions: {
                                    expiresIn: config.JWT_EXPIRE_MINUTES + 'm',
                                },
                            };
                        },
                        imports: [config_1.ConfigModule, keypair_module_1.KeypairModule],
                    }),
                ],
                useFactory: async (config) => ({
                    transport: {
                        host: config.get('MAIL_HOST'),
                        port: config.get('MAIL_PORT'),
                        secure: false,
                        auth: {
                            user: config.get('MAIL_USERNAME'),
                            pass: config.get('MAIL_PASSWORD'),
                        },
                    },
                    defaults: {
                        from: config.get('MAIL_FROM'),
                    },
                }),
                inject: [config_1.ConfigService],
            }),
            config_1.ConfigModule.forRoot(),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, signup_service_1.SignupService, jwt_strategy_1.JwtStrategy, prisma_service_1.PrismaService],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map