import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
import { NftImageService } from './nft-image.service';
import { ApiOperation, ApiResponse, ApiSecurity } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GenerateNftImageDto } from './dto/generate-nft-image.dto';

@Controller('nft-image')
export class NftImageController {
  constructor(private readonly nftImageService: NftImageService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Gera uma imagem de capa para o NFT a ser gerado',
    description: 'Rota restrita a médicos e enfermeiros',
  })
  @ApiResponse({
    status: 200,
    description:
      'Resposta com os dados da imagem, que devem ser enviados para o NFT',
  })
  @ApiResponse({
    status: 400,
    description: 'Erro na requisição',
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado',
  })
  @ApiResponse({
    status: 403,
    description: 'Usuário não é um médico ou enfermeiro',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno',
  })
  @ApiSecurity('JWT Bearer')
  @Post('generate')
  async generateNftImage(@Body() dto: GenerateNftImageDto, @Req() req) {
    return await this.nftImageService.generateNftImage(dto, req.user.data);
  }
}
