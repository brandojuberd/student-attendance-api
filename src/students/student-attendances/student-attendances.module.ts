import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WhatsappsModule } from 'src/whatsapps/whatsapp.module';
import { StudentAttendanceSchema } from './entities/student-attendance.entity';
import { StudentAttendancesResolver } from './student-attendances.resolver';
import { StudentAttendancesService } from './student-attendances.service';

// ${1 : PascalCase}
// ${2 : lowercase}

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'StudentAttendance', schema: StudentAttendanceSchema },
    ]),
    WhatsappsModule
  ],
  providers: [StudentAttendancesResolver, StudentAttendancesService],
})
export class StudentAttendancesModule {}
