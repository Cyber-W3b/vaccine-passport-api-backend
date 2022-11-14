import { Get, Injectable, NotFoundException, Post } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { MailerService } from '@nestjs-modules/mailer';
import { LoginStep2Dto } from './dto/login.step2.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private mailerService: MailerService,
    private jwtService: JwtService,
  ) {}

  /**
   * Gera o token e manda para o e-mail do usuário
   * @param cpf
   */
  async step1(cpf: string) {
    const user = await this.prisma.user.findFirstOrThrow({
      where: {
        cpf,
      },
    });

    //gera uma string randomica para o token
    const token =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    await this.prisma.tokenEmail.create({
      data: {
        token,
        cpf,
      },
    });

    // envia o e-mail para o usuário
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Seu login no sistema - Passport',
      html: `
        <p>Olá ${user.name}</p>
        <p>Para acessar sua conta, clique no link abaixo:</p>
        <a href="${process.env.FRONT_LOGIN_URL}/${token}">Acessar minha conta</a>
        <p>Se não for você, por favor desconsidere a esse e-mail.</p>`,
    });

    return true;
  }

  /**
   * Realiza o passo 2 de autenticação
   * @param dto
   */
  async step2(dto: LoginStep2Dto) {
    const token = await this.prisma.tokenEmail.findFirst({
      where: {
        token: dto.token,
      },
    });

    if (!token) {
      throw new NotFoundException('Token não encontrado');
    }

    const user = await this.prisma.user.findFirstOrThrow({
      where: {
        cpf: token.cpf,
      },
    });

    const jwt = this.jwtService.sign({
      sub: user.wallet,
    });

    await this.prisma.tokenEmail.delete({
      where: {
        id: token.id,
      },
    });

    return {
      token: jwt,
      user: user,
    };
  }

  /**
   * Faz o logout da sessão
   * @param token Token
   */
  async logout(token: string) {
    // coloca o token na lista de tokens ignorados
    await this.prisma.tokensInvalidos.create({
      data: {
        token: token,
      },
    });
  }
}
