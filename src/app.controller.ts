import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Verifica se a API está rodando' })
  @ApiResponse({
    status: 200,
    description: 'Indica que a API está rodando, se exibir a mensagem Working',
  })
  @ApiTags('Monitoramento')
  getHello() {
    return {
      status: 'Working',
      name: process.env.APP_NAME,
      timestamp: new Date().getTime(),
    };
  }
}
