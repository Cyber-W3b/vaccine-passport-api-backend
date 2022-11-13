import { HttpException } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupStep1Dto } from './dto/signup-step1.dto';
export declare class SignupController {
    private readonly signupService;
    constructor(signupService: SignupService);
    signupStep1(body: SignupStep1Dto): Promise<import(".prisma/client").User | HttpException>;
}
