import { PrismaService } from '../../prisma.service';
import { MailerService } from '@nestjs-modules/mailer';
export declare class AuthService {
    private prisma;
    private mailerService;
    constructor(prisma: PrismaService, mailerService: MailerService);
    step1(cpf: string): Promise<boolean>;
}
