import { Body, Controller, Post, Get, Request, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto"
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller('/users')
export class UsersController {

  constructor(private usersService: UsersService) {}

  @Post('/createuser')
  create(@Body() userDto: CreateUserDto){
    return this.usersService.createUser(userDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/get')
  getAll(){
    return this.usersService.getAllUsers();
  }
}

