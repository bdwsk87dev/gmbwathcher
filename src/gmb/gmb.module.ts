import { Module } from '@nestjs/common';
import { gmbController } from './gmb.controller';
import { LocationsService } from "../locations/locations.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Location } from "../locations/locations.model";
import { GmbService } from './gmb.service';
import { ConfigModule } from "@nestjs/config";
import { ChangesService } from "../changes/changes.service";

import { Change } from "../changes/changes.model";


@Module({
  controllers: [gmbController],
  providers: [LocationsService, GmbService, ChangesService],
  imports: [
    SequelizeModule.forFeature([Location, Change]),
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
  ]
})
export class GmbModule {}