import { AuthService } from './auth.service';
import { SignupService } from '../signup/signup.service';
import { LoginStep1Dto } from './dto/login.step1.dto';
import { LoginStep2Dto } from './dto/login.step2.dto';
export declare class AuthController {
    private readonly authService;
    private readonly signupService;
    constructor(authService: AuthService, signupService: SignupService);
    step1(dto: LoginStep1Dto): Promise<{
        status: boolean;
        message: string;
    }>;
    step2(dto: LoginStep2Dto): Promise<{
        token: string;
        user: import(".prisma/client").User;
    }>;
    whoami(req: any): Promise<any>;
    logout(req: any): Promise<void>;
}
