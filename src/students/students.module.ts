import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentSchema } from './entities/student.entity';
import { StudentsResolver } from './students.resolver';
import { StudentsService } from './students.service';

// ${1 : PascalCase}
// ${2 : lowercase}

@Module({
  imports: [
     MongooseModule.forFeature([{ name: 'Student', schema: StudentSchema }])
  ],
  providers: [StudentsResolver, StudentsService],
})
export class StudentsModule {}