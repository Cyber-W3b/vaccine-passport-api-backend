import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { SignupStep1Dto } from './dto/signup-step1.dto';

@Injectable()
export class SignupService {
  constructor(private prisma: PrismaService) {}

  /**
   * Cria um usuário de cadastro pendente no sistema
   * @param dto
   */
  async signupStep1(dto: SignupStep1Dto) {
    return this.prisma.user.create({
      data: {
        ...dto,
        completed: false,
      },
    });
  }

  /**
   * Puxa um usuário pelo email cadastrado
   * @param email
   */
  async getUserByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  /**
   * Puxa um usuário pela wallet cadastrada
   * @param wallet
   */
  async getUserByWallet(wallet: string) {
    return this.prisma.user.findFirst({
      where: {
        wallet,
      },
    });
  }
}
