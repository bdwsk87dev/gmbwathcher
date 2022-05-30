import { Controller, Request, Get, Post, UseGuards, Render, Param, Query } from "@nestjs/common";
import { LocationsService } from './locations.service';

@Controller('locations')
export class LocationsController {
  constructor(private locationsService: LocationsService) {}
  @Get('list')
  getLocations(@Query() query: {
    pageSize: number,
    pageIndex:number,
    orderField: string,
    orderAsc:string
  }){
    return this.locationsService.getLocations(
      query.pageSize,
      query.pageIndex,
      query.orderField,
      query.orderAsc
      );
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
