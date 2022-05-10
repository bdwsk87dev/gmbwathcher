import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./users.model";
import { CreateUserDto } from "./dto/create-user.dto";


@Injectable()
export class UsersService {

  constructor(@InjectModel(User) private userRepository: typeof User) {

  }

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    return user;
  }

  async getAllUsers(){
    const users = await this.userRepository.findAll();
    return users;
  }

  async findOne(username: string) {
    const user = await this.userRepository.findOne ({where:{username}})
    return user;
  }

  //
  // private readonly users = [
  //   {
  //     userId: 1,
  //     username: 'alex',
  //     password: '15616',
  //   },
  //   {
  //     userId: 2,
  //     username: 'something',
  //     password: '789858',
  //   },
  // ];

  // async findOne(username: string): Promise<User | undefined> {
  //   return this.users.find(user => user.username === username);
  // }
}

