import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassroomsResolver } from './classroom.resolver';
import { ClassroomsService } from './classrooms.service';
import { ClassroomSchema } from './entities/classroom.entity';

// ${1 : PascalCase}
// ${2 : lowercase}

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Classroom', schema: ClassroomSchema }]),
  ],
  providers: [ClassroomsResolver, ClassroomsService],
})
export class ClassroomsModule {}
