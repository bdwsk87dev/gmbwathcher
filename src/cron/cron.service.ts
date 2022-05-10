import { Get, Injectable, Request } from "@nestjs/common";

@Injectable()
export class CronService {

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

}
