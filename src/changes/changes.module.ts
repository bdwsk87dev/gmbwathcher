import { Module } from '@nestjs/common';
import { ChangesController } from './changes.controller';
import { ChangesService } from './changes.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { Change } from "./changes.model";
import { Location } from "../locations/locations.model"
import { LocationsService } from "../locations/locations.service";

@Module({
  controllers: [ChangesController],
  providers: [ChangesService, LocationsService],
  exports: [ChangesService],
  imports:[
    SequelizeModule.forFeature([Change, Location])
  ]
})
export class ChangesModule {}
