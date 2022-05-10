import { Controller, Request, Get, Post, UseGuards, Render } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard'
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class appController{
    constructor(private authService: AuthService) {}

    // Login, get local user token

    @Get()
    @Render('index')
    root() {
        return { message: 'Hello world!' };
    }

    // No auth
    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req) {
        console.log(req)
        return this.authService.login(req.user);
    }

    // Already auth
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}