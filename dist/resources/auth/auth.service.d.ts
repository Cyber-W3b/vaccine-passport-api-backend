import { PrismaService } from '../../prisma.service';
import { MailerService } from '@nestjs-modules/mailer';
import { LoginStep2Dto } from './dto/login.step2.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private prisma;
    private mailerService;
    private jwtService;
    constructor(prisma: PrismaService, mailerService: MailerService, jwtService: JwtService);
    step1(cpf: string): Promise<boolean>;
    step2(dto: LoginStep2Dto): Promise<{
        token: string;
        user: import(".prisma/client").User;
    }>;
}
