import { Controller, Get, Request } from "@nestjs/common";
import { CronService } from "./cron.service";

@Controller('/cron')
export class CronController {
  constructor(private authService: CronService) {}
  @Get('/start')
  start(@Request() req) {
    return 22;
  }
}
