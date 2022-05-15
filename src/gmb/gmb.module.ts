import { Module } from '@nestjs/common';
import { gmbController } from './gmb.controller';
import { LocationsService } from "../locations/locations.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Location } from "../locations/locations.model";

@Module({
  controllers: [gmbController],
  providers: [LocationsService],
  imports: [
    SequelizeModule.forFeature([Location])
  ]
})
export class GmbModule {}
