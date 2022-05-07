import {Module} from "@nestjs/common";
import {appController} from "./app.controller";
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
// import { SequelizeModule } from '@nestjs/sequelize';
import { GmbModule } from './gmb/gmb.module';

@Module({
    controllers:[appController],
    // imports: [ SequelizeModule.forRoot({
    //     dialect: 'postgres',
    //     host: 'localhost',
    //     port: 5432,
    //     username: 'postgres',
    //     password: 'root',
    //     database: 'npgmbnest',
    //     models: [],
    //     autoLoadModels: true
    // }), AuthModule, UsersModule, GmbModule]


    imports: [ AuthModule, UsersModule, GmbModule]
})
export class AppModule{}
