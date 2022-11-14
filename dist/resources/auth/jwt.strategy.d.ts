import { Strategy } from 'passport-jwt';
import { Request } from 'express';
import { PrismaService } from '../../prisma.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private prisma;
    constructor(prisma: PrismaService);
    validate(request: Request, payload: any): Promise<{
        data: import(".prisma/client").User;
        payload: any;
        token: string;
    }>;
}
export {};
