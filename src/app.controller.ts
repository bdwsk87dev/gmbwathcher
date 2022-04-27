import {Controller, Get} from "@nestjs/common";

@Controller('/api')
export class appController{
    @Get('/users')
    getUsers(){
        return [{id:1, name: 'Hello'}]
    }
}