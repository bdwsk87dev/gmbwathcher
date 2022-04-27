import {Module} from "@nestjs/common";
import {appController} from "./app.controller";
import {gmbController} from "./gmb.controller"

@Module({
    controllers:[appController, gmbController]
})
export class AppModule{}

