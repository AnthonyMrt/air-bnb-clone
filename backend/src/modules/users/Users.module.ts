import { Module } from '@nestjs/common';
import { UsersService } from './Users.service';
import { Users } from './Users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './Users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
