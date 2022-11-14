"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftImageService = void 0;
const common_1 = require("@nestjs/common");
const node_html_to_image_1 = require("node-html-to-image");
const dayjs = require("dayjs");
let NftImageService = class NftImageService {
    async generateNftImage(dto, data) {
        const date_formatted = dayjs(dto.dateApplication).format('DD/MM/YYYY');
        let line_responsible = '';
        if (data.corenNumber) {
            line_responsible = `Enfermeiro(a): ${data.name} - COREN: ${data.corenNumber}`;
        }
        else if (data.crmNumber) {
            line_responsible = `Médico(a): ${data.name} - CRM: ${data.crmNumber}`;
        }
        return await (0, node_html_to_image_1.default)({
            encoding: 'binary',
            type: 'png',
            html: `
        <html>
            <head>
                <style>
                    body {
                        width: 600px;
                        height: 300px;
                        background-color: #fff;
                        font-family: 'Roboto', sans-serif;
                    }
                    .container {
                        width: 98.5%;
                        height: 97%;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        border: 5px outset #1C6EA4;
                    }
                    h1, p{
                        margin-bottom: 10px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Certificado de Vacinação</h1>
                    <p>Vacina: ${dto.vaccineType}</p>
                    <p>Dose: ${dto.dosis} - Lote: ${dto.batch} - Unidade: ${dto.unity}</p>
                    <p>Data de aplicação: ${date_formatted}</p>
                    <p>${line_responsible}</p>
                </div>
            </body>
        </html>`,
        });
    }
};
NftImageService = __decorate([
    (0, common_1.Injectable)()
], NftImageService);
exports.NftImageService = NftImageService;
//# sourceMappingURL=nft-image.service.js.map