import { Controller, Request, Get, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class appController{

    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    // @UseGuards(AuthGuard('local'))
    // @Get('auth/test')
    // getUsers(){
    //     return [{id:1111, name: 'Hello2'}]
    // }
}