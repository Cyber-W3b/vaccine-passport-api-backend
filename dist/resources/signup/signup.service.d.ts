import { PrismaService } from '../../prisma.service';
import { SignupStep1Dto } from './dto/signup-step1.dto';
export declare class SignupService {
    private prisma;
    constructor(prisma: PrismaService);
    signupStep1(dto: SignupStep1Dto): Promise<import(".prisma/client").User>;
    getUserByEmail(email: string): Promise<import(".prisma/client").User>;
    getUserByWallet(wallet: string): Promise<import(".prisma/client").User>;
}
