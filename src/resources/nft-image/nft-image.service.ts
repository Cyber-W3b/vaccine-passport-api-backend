import { Injectable } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { GenerateNftImageDto } from './dto/generate-nft-image.dto';
import nodeHtmlToImage from 'node-html-to-image';
import * as dayjs from 'dayjs';

@Injectable()
export class NftImageService {
  async generateNftImage(dto: GenerateNftImageDto, data: User) {
    const date_formatted = dayjs(dto.dateApplication).format('DD/MM/YYYY');

    let line_responsible = '';

    if (data.corenNumber) {
      line_responsible = `Enfermeiro(a): ${data.name} - COREN: ${data.corenNumber}`;
    } else if (data.crmNumber) {
      line_responsible = `Médico(a): ${data.name} - CRM: ${data.crmNumber}`;
    }

    return await nodeHtmlToImage({
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
}
