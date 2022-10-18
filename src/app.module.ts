import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ObjectIdScalar } from './common/graphql/scalars/object-id.scalars';
import { checkEnvVariable } from './common/helpers/check-env-variable.helper';
import { StudentsModule } from './students/students.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { WhatsappsModule } from './whatsapps/whatsapp.module';
import { AuthModule } from './auth/auth.module';
import { SchoolsModule } from './schools/schools.module';
import { ClassroomsModule } from './classrooms/classrooms.module';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    AuthModule,
    ClassroomsModule,
    StudentsModule,
    SchoolsModule,
    UsersModule,
    WhatsappsModule,
    MongooseModule.forRoot(checkEnvVariable('MONGO_URI')),
  ],
  controllers: [AppController],
  providers: [AppService, ObjectIdScalar],
})
export class AppModule {}
