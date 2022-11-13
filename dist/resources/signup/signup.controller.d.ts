import { HttpException } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupStep1Dto } from './dto/signup-step1.dto';
import { SignupStep2Dto } from './dto/signup-step2.dto';
export declare class SignupController {
    private readonly signupService;
    constructor(signupService: SignupService);
    signupStep1(body: SignupStep1Dto): Promise<import(".prisma/client").User | HttpException>;
    signupStep2(body: SignupStep2Dto): Promise<import(".prisma/client").User | HttpException>;
}
