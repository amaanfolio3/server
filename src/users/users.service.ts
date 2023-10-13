import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'Ahmed',
      password: 'abdullah',
      email: 'ahmedabdullah@folio3.com',
    },
    {
      userId: 2,
      username: 'Amaan',
      password: 'ullah',
      email: 'amanullahjalal@folio3.com',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
