import {Module} from "@nestjs/common";
import {appController} from "./app.controller";
import {gmbController} from "./gmb.controller"
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
    controllers:[appController, gmbController],
    imports: [AuthModule, UsersModule]
})
export class AppModule{}

