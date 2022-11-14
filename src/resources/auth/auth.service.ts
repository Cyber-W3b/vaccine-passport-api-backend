import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private mailerService: MailerService,
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
}
