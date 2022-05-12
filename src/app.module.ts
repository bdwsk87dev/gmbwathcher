import {Module} from "@nestjs/common";
import {appController} from "./app.controller";
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { GmbModule } from './gmb/gmb.module';
import { ConfigModule } from '@nestjs/config'
import { User } from './users/users.model'
import { GmbaccountsModule } from './gmbaccounts/gmbaccounts.module';
import { LocationsModule } from './locations/locations.module';
import { Location } from "./locations/locations.model";
import { GmbAccount } from "./gmbaccounts/gmbaccounts.model";

@Module({
    controllers:[appController],

    imports: [
      ConfigModule.forRoot({
          envFilePath: `.${process.env.NODE_ENV}.env`
      }),
      SequelizeModule.forRoot({
        dialect: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        models: [User, Location, GmbAccount],
        autoLoadModels: true
    }), AuthModule, UsersModule, GmbModule, GmbaccountsModule, LocationsModule]

})
export class AppModule{}
