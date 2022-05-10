import { AuthService } from './auth/auth.service';
export declare class appController {
    private authService;
    constructor(authService: AuthService);
    root(): {
        message: string;
    };
    login(req: any): Promise<{
        access_token: string;
    }>;
    getProfile(req: any): any;
}
