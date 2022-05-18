import { Controller, Request, Get, Post, UseGuards, Render } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard'
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class appController{
    constructor(private authService: AuthService) {}

    @Get()
    @Render('index')
    root() {
        return { message: 'Сервер працює...' };
    }

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('auth/current-user')
    getProfile(@Request() req) {
        return req.user;
    }
}