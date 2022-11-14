import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupService } from '../signup/signup.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginStep1Dto } from './dto/login.step1.dto';
import { LoginStep2Dto } from './dto/login.step2.dto';

@Controller('auth')
@ApiTags('Login')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly signupService: SignupService,
  ) {}

  @ApiOperation({
    summary:
      'Step 1 - Verifica se o CPF está cadastrado e envia um e-mail para o usuário para verificação',
  })
  @ApiResponse({
    status: 200,
    description: 'Link mágico enviado por e-mail do usuário',
  })
  @ApiResponse({
    status: 400,
    description: 'Requisição inválida',
  })
  @ApiResponse({
    status: 404,
    description: 'CPF não encontrado',
  })
  @Post('step1')
  async step1(@Body() dto: LoginStep1Dto) {
    const userByCpf = await this.signupService.getUserByCpf(dto.cpf);

    if (!userByCpf) {
      throw new NotFoundException('CPF não encontrado');
    }

    await this.authService.step1(dto.cpf);

    return {
      status: true,
      message: 'Link mágico enviado por e-mail do usuário',
    };
  }

  @ApiOperation({
    summary:
      'Step 2 - Realiza o token do usuário por meio do token enviado por e-mail',
  })
  @ApiResponse({
    status: 200,
    description:
      'Token do usuário validado e gerado o token JWT para interações futuras',
  })
  @ApiResponse({
    status: 400,
    description: 'Requisição inválida',
  })
  @ApiResponse({
    status: 404,
    description: 'Token não encontrado ou expirado',
  })
  @Post('step2')
  async step2(@Body() dto: LoginStep2Dto) {
    return await this.authService.step2(dto);
  }
}
