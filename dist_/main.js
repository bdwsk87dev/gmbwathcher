"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path_1 = require("path");
async function start() {
    console.log(process.env.PORT);
    const PORT = process.env.PORT || 3000;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'public'));
    app.setBaseViewsDir((0, path_1.join)(__dirname, '../../', 'views'));
    app.setViewEngine('hbs');
    app.enableCors();
    await app.listen(PORT, () => console.log(`Сервер запущен на порту : ${PORT}`));
}
start();
//# sourceMappingURL=main.js.map