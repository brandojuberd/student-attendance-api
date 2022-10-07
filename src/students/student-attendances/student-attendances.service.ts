import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, QueryOptions } from 'mongoose';
import { Service } from 'src/common/services/base-service.service';
import { StudentAttendancesList } from './dto/student-attendance-lists.object';
import { StudentAttendance } from './entities/student-attendance.entity';
// import { SolutionProcedureVariant } from './classes/solution-procedure-variants.schema';

// ${1 : PascalCase}
// ${2 : camelCase}
@Injectable()
export class StudentAttendancesService extends Service<
 StudentAttendance 
> {
  constructor(
    @InjectModel('StudentAttendance')
    private readonly studentAttendanceModel: Model<StudentAttendance>,
  ) {
    super(studentAttendanceModel);
  }

  async getStudentAttendancesList(
    query: FilterQuery<StudentAttendance>,
    // userContext: UserContext,
    projection?: any,
    options?: QueryOptions
  ): Promise<StudentAttendancesList> {
    const studentAttendances = await this.find(query, projection, options);
    const count = await this.count(query);
    return {
      studentAttendances,
      count,
    };
  }
}
