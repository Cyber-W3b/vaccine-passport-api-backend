import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SignupModule } from './resources/signup/signup.module';
import { AuthModule } from './resources/auth/auth.module';
import { NftImageModule } from './resources/nft-image/nft-image.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SignupModule,
    AuthModule,
    NftImageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
