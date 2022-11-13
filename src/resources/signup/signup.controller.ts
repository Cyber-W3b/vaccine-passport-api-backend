import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { SignupService } from './signup.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignupStep1Dto } from './dto/signup-step1.dto';
import { User } from '../../entities/user.entity';

@Controller('signup')
@ApiTags('Cadastro')
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @ApiOperation({
    summary: 'Step 1 - Cria um novo usuário pendente de cadastro',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário pendente de cadastro criado com êxito',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados de cadastro inválidos',
  })
  @ApiResponse({
    status: 409,
    description: 'Wallet ou e-mail já cadastrados',
  })
  @Post('step1')
  async signupStep1(@Body() body: SignupStep1Dto) {
    const userByEmail = await this.signupService.getUserByEmail(body.email);
    const userByWallet = await this.signupService.getUserByWallet(body.wallet);

    if (userByEmail || userByWallet) {
      return new HttpException('Wallet ou e-mail já cadastrados', 409);
    }
    return this.signupService.signupStep1(body);
  }
}
