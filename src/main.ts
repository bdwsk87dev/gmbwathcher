import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";

import { NestExpressApplication } from '@nestjs/platform-express';

async function start(){
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create<NestExpressApplication>(AppModule)
    await app.listen(PORT, ()=> console.log(`Сервер запущен на порту : ${PORT}`))
}

start();
