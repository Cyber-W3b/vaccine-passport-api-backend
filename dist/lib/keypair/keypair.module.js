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
var KeypairModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeypairModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const fs = require("fs");
const keypair = require('keypair');
let KeypairModule = KeypairModule_1 = class KeypairModule {
    constructor() {
        var _a;
        this.logger = new common_1.Logger(KeypairModule_1.name);
        try {
            const pairs = {};
            if (!fs.existsSync(process.env.JWT_KEY_FOLDER)) {
                fs.mkdirSync(process.env.JWT_KEY_FOLDER);
            }
            if (!fs.existsSync(process.env.JWT_KEY_FOLDER + '/private.key') &&
                !fs.existsSync(process.env.JWT_KEY_FOLDER + '/public.key')) {
                this.logger.warn('Keys do not exist. Creating them.');
                const pair = keypair({
                    bits: (_a = Number(process.env.API_CRIPTO_BITS_JWT)) !== null && _a !== void 0 ? _a : 128,
                });
                fs.writeFileSync(process.env.JWT_KEY_FOLDER + '/public.key', pair.public);
                fs.writeFileSync(process.env.JWT_KEY_FOLDER + '/private.key', pair.private);
                this.logger.log('Keys created and being served to the app.');
            }
        }
        catch (e) {
            this.logger.error('Error loading or generating keys. Sorry.');
            console.error(e);
            process.exit(100);
        }
        this.logger.log('Keypair Module initialized');
    }
    static getKeyPair() {
        if (this.pairs) {
            return this.pairs;
        }
        const pub = fs.readFileSync(process.env.JWT_KEY_FOLDER + '/public.key', 'utf8');
        const pri = fs.readFileSync(process.env.JWT_KEY_FOLDER + '/private.key', 'utf8');
        this.pairs = {
            public: pub,
            private: pri,
        };
        return this.pairs;
    }
};
KeypairModule.pairs = null;
KeypairModule = KeypairModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule],
    }),
    __metadata("design:paramtypes", [])
], KeypairModule);
exports.KeypairModule = KeypairModule;
//# sourceMappingURL=keypair.module.js.map