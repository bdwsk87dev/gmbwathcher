import { Module } from '@nestjs/common';
import { LocationsController } from './locations.controller';
import { LocationsService } from "./locations.service";
import { Location } from "./locations.model";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
  controllers: [LocationsController],
  providers: [LocationsService],
  imports:[
    SequelizeModule.forFeature([Location])
  ]
})
export class LocationsModule {}
