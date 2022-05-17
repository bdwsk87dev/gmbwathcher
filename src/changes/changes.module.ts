import { Module } from '@nestjs/common';
import { ChangesController } from './changes.controller';
import { ChangesService } from './changes.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { Change } from "./changes.model";
import { Location } from "../locations/locations.model"

@Module({
  controllers: [ChangesController],
  providers: [ChangesService],
  imports:[
    SequelizeModule.forFeature([Change, Location])
  ]
})
export class ChangesModule {}
