import { AuthService } from './auth.service';
import { SignupService } from '../signup/signup.service';
import { LoginStep1Dto } from './dto/login.step1.dto';
export declare class AuthController {
    private readonly authService;
    private readonly signupService;
    constructor(authService: AuthService, signupService: SignupService);
    step1(dto: LoginStep1Dto): Promise<{
        status: boolean;
        message: string;
    }>;
}
