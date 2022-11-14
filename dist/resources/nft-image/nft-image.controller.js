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
exports.NftImageController = void 0;
const common_1 = require("@nestjs/common");
const nft_image_service_1 = require("./nft-image.service");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const generate_nft_image_dto_1 = require("./dto/generate-nft-image.dto");
let NftImageController = class NftImageController {
    constructor(nftImageService) {
        this.nftImageService = nftImageService;
    }
    async generateNftImage(dto, req, res) {
        if (!req.user.data.corenNumber && !req.user.data.crmNumber) {
            return res.status(403).json({
                message: 'Usuário não é um médico ou enfermeiro',
            });
        }
        const image = await this.nftImageService.generateNftImage(dto, req.user.data);
        return res
            .status(200)
            .set({
            'Content-Type': 'image/png',
        })
            .send(image);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Gera uma imagem de capa para o NFT a ser gerado',
        description: 'Rota restrita a médicos e enfermeiros',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Resposta com os dados da imagem, que devem ser enviados para o NFT',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Erro na requisição',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Não autorizado',
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Usuário não é um médico ou enfermeiro',
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Erro interno',
    }),
    (0, swagger_1.ApiSecurity)('JWT Bearer'),
    (0, common_1.Post)('generate'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [generate_nft_image_dto_1.GenerateNftImageDto, Object, Object]),
    __metadata("design:returntype", Promise)
], NftImageController.prototype, "generateNftImage", null);
NftImageController = __decorate([
    (0, common_1.Controller)('nft-image'),
    __metadata("design:paramtypes", [nft_image_service_1.NftImageService])
], NftImageController);
exports.NftImageController = NftImageController;
//# sourceMappingURL=nft-image.controller.js.map