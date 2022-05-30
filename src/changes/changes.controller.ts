import { Controller, Request, Get, Post, UseGuards, Render, Param } from "@nestjs/common";
import { ChangesService } from './changes.service';

@Controller('changes')
export class ChangesController {
  constructor(private changesService: ChangesService) {}
  @Get(':name')
  getLocationChanges(@Param('name') name){
    return this.changesService.getLocationChanges(name);
  }
}
