import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { checkEnvVariable } from 'src/common/helpers/check-env-variable.helper';
import { UsersModule } from 'src/users/users.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt-strategy';

// ${1 : PascalCase}
// ${2 : lowercase}

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: checkEnvVariable('JWT_SECRET'),
      signOptions: { expiresIn: '3d' },
    }),
    UsersModule,
  ],
  providers: [
    AuthService,
    JwtStrategy,
    AuthResolver,
  ],
  exports: [
    AuthService,
    JwtModule,
  ],
})
export class AuthModule {}
