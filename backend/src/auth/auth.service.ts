import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/modules/users/Users.entity';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/modules/users/Users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signin(user: Users): Promise<any> {
    const foundUser = await this.usersService.userGet(user.email);
    if (foundUser) {
      const { password } = foundUser;
      if (bcrypt.compare(user.password, password)) {
        const payload = { email: user.email };
        return {
          accessToken: this.jwtService.sign(payload),
        };
      }
      return new HttpException(
        'email ou mot de passe incorrect',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return new HttpException(
      'email ou mot de passe incorrect',
      HttpStatus.UNAUTHORIZED,
    );
  }

  async login(user: any) {
    const payload = { username: user.username, userId: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
