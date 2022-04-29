import { Controller, Request, Get, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';

@Controller('api')
export class appController{
    @UseGuards(AuthGuard('local'))
    @Get('/users')
    getUsers(){
        return [{id:1111, name: 'Hello2'}]
    }
    @Post('/auth/login')
    async login(@Request() req) {
        return req.user;
    }
}