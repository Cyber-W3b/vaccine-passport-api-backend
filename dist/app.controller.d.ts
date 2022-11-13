import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): {
        status: string;
        name: string;
        timestamp: number;
    };
}
