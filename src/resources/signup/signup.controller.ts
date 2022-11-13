import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { SignupService } from './signup.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignupStep1Dto } from './dto/signup-step1.dto';
import { User } from '../../entities/user.entity';
import { SignupStep2Dto } from './dto/signup-step2.dto';

@Controller('signup')
@ApiTags('Cadastro')
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @ApiOperation({
    summary: 'Step 1 - Cria um novo usuário pendente de cadastro',
  })
  @ApiResponse({
    status: 200,
    description:
      'Usuário pendente de cadastro criado com êxito. Ou usuário existe, mas ainda está pendente de cadastro.',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados de cadastro inválidos',
  })
  @ApiResponse({
    status: 409,
    description: 'Wallet ou e-mail já cadastrados e já completaram o cadastro.',
  })
  @Post('step1')
  async signupStep1(@Body() body: SignupStep1Dto) {
    const userByEmail = await this.signupService.getUserByEmail(body.email);
    const userByWallet = await this.signupService.getUserByWallet(body.wallet);

    if (userByEmail || userByWallet) {
      if (userByWallet && userByWallet.completed === false) {
        return userByWallet;
      }

      if (userByEmail && userByEmail.completed === false) {
        return userByEmail;
      }

      return new HttpException('Wallet ou e-mail já cadastrados', 409);
    }
    return this.signupService.signupStep1(body);
  }

  @ApiOperation({
    summary: 'Step 2 - Finaliza o cadastro de um usuário',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário atualizado com êxito - podendo fazer login depois',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados de cadastro inválidos',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário com a Wallet inexistente',
  })
  @ApiResponse({
    status: 409,
    description:
      'Usuário já tem cadastro completo ou já existe um cadastro com mesmo CPF',
  })
  @Post('step2')
  async signupStep2(@Body() body: SignupStep2Dto) {
    const user = await this.signupService.getUserByWallet(body.wallet);

    if (!user) {
      return new HttpException('Usuário com a Wallet inexistente', 404);
    }

    if (user.completed) {
      return new HttpException('Usuário já cadastrado', 409);
    }

    const userByCpf = await this.signupService.getUserByCpf(body.cpf);

    if (userByCpf) {
      return new HttpException('CPF já cadastrado', 409);
    }

    return this.signupService.signupStep2(body);
  }
}
