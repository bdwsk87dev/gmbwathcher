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
    orderAsc:string,
    searchString:string,
    onlyChanges:boolean,
    dateRangeStart:string,
    dateRangeEnd:string

  }){
    return this.locationsService.getLocations(
      query.pageSize,
      query.pageIndex,
      query.orderField,
      query.orderAsc,
      query.searchString,
      query.onlyChanges,
      query.dateRangeStart,
      query.dateRangeEnd
      );
  }
  @Get('count')
  getCount(@Query() query: {
    searchString:string,
    onlyChanges:boolean,
    dateRangeStart:string,
    dateRangeEnd:string
  }){
    return this.locationsService.getCount(
      query.searchString,
      query.onlyChanges,
      query.dateRangeStart,
      query.dateRangeEnd
    );
  }
  @Get(':name')
  getLocation(@Param('name') name){
    return this.locationsService.getLocationByName(name);
  }

}
