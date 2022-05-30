import { Controller, Request, Get, Post, UseGuards, Render, Param } from "@nestjs/common";
import { LocationsService } from './locations.service';

@Controller('locations')
export class LocationsController {
  constructor(private locationsService: LocationsService) {}
  @Get('list')
  getLocations(){
    return this.locationsService.getLocations();
  }
  @Get(':name')
  getLocation(@Param('name') name){
    return this.locationsService.getLocationByName(name);
  }
}
