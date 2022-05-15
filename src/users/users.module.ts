import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from './users.model';
import { UsersController} from "./users.controller";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
  imports: [
    SequelizeModule.forFeature([User])
  ]
})
export class UsersModule {}
