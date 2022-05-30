import { Controller, Request, Get, Post, UseGuards, Render, Param, Query } from "@nestjs/common";
import { LocationsService } from './locations.service';

@Controller('locations')
export class LocationsController {
  constructor(private locationsService: LocationsService) {}
  @Get('list')
  getLocations(@Query() query: { pageSize: number, pageIndex:number }){
    return this.locationsService.getLocations(query.pageSize, query.pageIndex);
  }
  @Get('count')
  getCount(){
    return this.locationsService.getCount();
  }
  @Get(':name')
  getLocation(@Param('name') name){
    return this.locationsService.getLocationByName(name);
  }

}
