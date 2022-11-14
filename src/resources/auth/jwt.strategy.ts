/* eslint-disable prettier/prettier */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { KeypairModule } from '../../lib/keypair/keypair.module';
import { Request } from 'express';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: KeypairModule.getKeyPair().private,
      passReqToCallback: true,
    });
  }

  /**
   * Disparado quando o token está válido
   * Aqui, validamos o usuário e verificamos se está ativo
   * Forma o campo req.user da request
   * @param request
   * @param payload
   */
  async validate(request: Request, payload: any) {
    // se o sub não é um número, nega a requisição, pois os usuários são apenas números
    if (isNaN(payload.sub)) {
      throw new UnauthorizedException();
    }

    const user = await this.prisma.user.findUnique({
          where: {
            wallet: payload.sub,
          },
        }
    );

    const token_header = request.headers.authorization.split(' ')[1];

    // verifica se o token está na tabela de logins inválidos
    const token = await this.prisma.tokensInvalidos.findUnique({
      where: {
        token: token_header,
      },
    });

    // se o usuario não for encontrado ou não for ativo ou seu token está na blacklist
    // também nega se o usuário não estiver vinculado a uma empresa
    // e nega se o id da empresa não bater com o header, com o payload e com o do usuário salvo
    if (
      !user ||
      token
    ) {
      throw new UnauthorizedException();
    }

    return {
      data: user,
      payload: payload,
      token: token_header,
    };
  }
}
