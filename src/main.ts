import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ApiTags, DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

Prisma.Decimal.prototype.toJSON = function () {
  return this.toNumber();
};

const logger = new Logger('StartServer');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validacao ativada
  // Ativando o decorator Transform
  app.useGlobalPipes(
    new ValidationPipe(),
    new ValidationPipe({
      transform: true,
    }),
  );

  // Activating Cors
  app.enableCors();

  // config swagger
  const config = new DocumentBuilder()
    .setTitle('Vaccine Passport API')
    .setDescription('API para o sistema de passaporte da vacina')
    .setVersion('0.2')
    .addServer('http://localhost:4004', 'Servidor de teste')
    .addApiKey(
      {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
        description:
          'Token JWT do usuário logado no sistema - precedido de Bearer',
      },
      'JWT Bearer',
    )
    .addTag('Monitoramento')
    .addTag('Cadastro')
    .addTag('Login')
    .addTag('Geração de imagens')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.API_PORT);
}
bootstrap();
