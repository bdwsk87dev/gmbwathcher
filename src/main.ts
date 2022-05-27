import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
async function start(){
    console.log(process.env.PORT)
    const PORT = process.env.PORT || 3000;
    const app = await NestFactory.create<NestExpressApplication>(AppModule)
    app.useStaticAssets(join(__dirname, '..', 'public'));
    app.setBaseViewsDir(join(__dirname, '../', 'views'));
    app.setViewEngine('hbs');
    app.enableCors();
    await app.listen(PORT, ()=> console.log(`Сервер запущен на порту : ${PORT}`))
}
start();
