"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
BigInt.prototype.toJSON = function () {
    return this.toString();
};
client_1.Prisma.Decimal.prototype.toJSON = function () {
    return this.toNumber();
};
const logger = new common_1.Logger('StartServer');
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe(), new common_1.ValidationPipe({
        transform: true,
    }));
    app.enableCors();
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Vaccine Passport API')
        .setDescription('API para o sistema de passaporte da vacina')
        .setVersion('0.2')
        .addServer('http://localhost:4004', 'Servidor de teste')
        .addApiKey({
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
        description: 'Token JWT do usuário logado no sistema - precedido de Bearer',
    }, 'JWT Bearer')
        .addTag('Monitoramento')
        .addTag('Cadastro')
        .addTag('Login')
        .addTag('Geração de imagens')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
    await app.listen(process.env.API_PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map