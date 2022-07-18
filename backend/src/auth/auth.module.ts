import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UsersModule } from 'src/modules/users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { LocationController } from 'src/modules/locations/Location.controller';
import { isAuthenticated } from 'src/app.middleware';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(isAuthenticated)
      .exclude(
        { path: 'locations', method: RequestMethod.GET },
        { path: 'locations/search', method: RequestMethod.GET },
        { path: 'locations/location/:id', method: RequestMethod.GET },
      )
      .forRoutes(LocationController);
  }
}
