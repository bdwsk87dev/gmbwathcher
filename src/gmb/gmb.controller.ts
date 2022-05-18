import { Controller, Get, Res, HttpStatus } from "@nestjs/common";
import { GmbService } from "./gmb.service";

@Controller("/gmb")
export class gmbController {

  constructor(private gmbSevice: GmbService) {}

  @Get("/cron/start")
  async start() {
    this.gmbSevice.startCron();
  }

  @Get("/authurl")
  async authurl() {
    return this.gmbSevice.authurl();
  }
}
