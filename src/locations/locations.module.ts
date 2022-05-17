import { Module } from '@nestjs/common';
import { LocationsController } from './locations.controller';
import { LocationsService } from "./locations.service";
import { Location } from "./locations.model";
import { SequelizeModule } from "@nestjs/sequelize";
import { Change } from "../changes/changes.model"

@Module({
  controllers: [LocationsController],
  providers: [LocationsService],
  imports:[
    SequelizeModule.forFeature([Location, Change])
  ]
})
export class LocationsModule {}
