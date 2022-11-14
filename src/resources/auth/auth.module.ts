import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../../prisma.service';
import { SignupService } from '../signup/signup.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { KeypairModule } from '../../lib/keypair/keypair.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [
        ConfigModule,
        JwtModule.registerAsync({
          useFactory: (
            config: any = process.env,
            keypair = KeypairModule.getKeyPair(),
          ) => {
            return {
              privateKey: keypair.private,
              publicKey: keypair.public,
              signOptions: {
                expiresIn: config.JWT_EXPIRE_MINUTES + 'm',
              },
            };
          },
          imports: [ConfigModule, KeypairModule],
        }),
      ],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('MAIL_HOST'),
          port: config.get('MAIL_PORT'),
          secure: false,
          auth: {
            user: config.get('MAIL_USERNAME'),
            pass: config.get('MAIL_PASSWORD'),
          },
        },
        defaults: {
          from: config.get('MAIL_FROM'),
        },
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [AuthController],
  providers: [AuthService, SignupService, JwtStrategy, PrismaService],
})
export class AuthModule {}
