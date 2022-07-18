import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './Users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserI } from './users.interface';

// This should be a real class/interface representing a user entity

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async getUsers(): Promise<Users[]> {
    const users = this.userRepository.find();

    return users;
  }

  async signup(user: UserI): Promise<Users> {
    console.log(user);
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);
    const reqBody = {
      name: user.name,
      username: user.username,
      email: user.email,
      password: hash,
    };
    return await this.userRepository.save(this.userRepository.create(reqBody));
  }

  async userGet(email: Users['email']): Promise<Users> {
    return await this.userRepository.findOneOrFail({ email });
  }

  async findOneByUsername(username: string): Promise<Users> {
    const user = this.userRepository.findOneOrFail({
      where: [{ username: username }],
    });
    return user;
  }

  async findOneByEmail(email: string): Promise<Users> {
    console.log(email);
    const user = this.userRepository.findOneOrFail({
      where: [{ email: email }],
    });
    return user;
  }
}
