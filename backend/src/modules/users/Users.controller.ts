import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { UserI } from './users.interface';
import { UsersService } from './Users.service';

@Controller('users')
export class UsersController {
  userRepository: any;
  constructor(private readonly usersService: UsersService) {}

  /** List all Users in database with this endpoint */
  @Get('/all')
  async getAllUsers() {
    return await this.usersService.getUsers();
  }

  @Post()
  async register(@Body() user: UserI) {
    console.log(user.password);
    const newUser = await this.usersService.signup(user);
    if (!newUser) {
      return console.log("Erreur dans la création de l'utilisateur");
    }
    return newUser;
  }

  //get User by username
  @Post('/checkUsername')
  async getUserByUsername(@Request() req) {
    return await this.usersService.findOneByUsername(req.body.username);
  }

  //get User by email
  @Post('/checkEmail')
  async getUserByEmail(@Request() req) {
    return await this.usersService.findOneByEmail(req.body.email);
  }
}
