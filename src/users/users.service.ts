import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'alex',
      password: '15616',
    },
    {
      userId: 2,
      username: 'something',
      password: '789858',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}

// curl http://localhost:5000/profile -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsZXgiLCJzdWIiOjEsImlhdCI6MTY1MTcxMzI4OCwiZXhwIjoxNjUxNzEzMzQ4fQ.C0GqZLhuzGW2TouE4poiFKf0ZC1GpoOxpGGlidmoUJc"