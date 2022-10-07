import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entities/users.entity';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

// ${1 : PascalCase}
// ${2 : lowercase}

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
