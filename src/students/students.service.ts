import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, QueryOptions } from 'mongoose';
import { Service } from 'src/common/services/base-service.service';
import { StudentsList } from './dto/students-list.object';
import { Student } from './entities/student.entity';
// import { SolutionProcedureVariant } from './classes/solution-procedure-variants.schema';

// ${1 : PascalCase}
// ${2 : camelCase}
@Injectable()
export class StudentsService extends Service<
 Student 
> {
  constructor(
    @InjectModel('Student')
    private readonly studentModel: Model<Student>,
  ) {
    super(studentModel);
  }

  async getStudentsList(
    query: FilterQuery<Student>,
    // userContext: UserContext,
    projection?: any,
    options?: QueryOptions
  ): Promise<StudentsList> {
    const students = await this.find(query, projection, options);
    const count = await this.count(query);
    return {
      students,
      count,
    };
  }
}
