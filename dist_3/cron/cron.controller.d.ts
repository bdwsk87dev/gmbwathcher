import { CronService } from "./cron.service";
export declare class CronController {
    private authService;
    constructor(authService: CronService);
    start(req: any): number;
}
