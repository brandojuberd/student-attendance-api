import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, QueryOptions } from 'mongoose';
import { Service } from 'src/common/services/base-service.service';
import { ClassroomsList } from './dto/classrooms-list.object';
import { Classroom } from './entities/classroom.entity';
// import { SolutionProcedureVariant } from './classes/solution-procedure-variants.schema';

// ${1 : PascalCase}
// ${2 : camelCase}
@Injectable()
export class ClassroomsService extends Service<Classroom> {
  constructor(
    @InjectModel('Classroom')
    private readonly classroomModel: Model<Classroom>,
  ) {
    super(classroomModel);
  }

  async getClassroomsList(
    query: FilterQuery<Classroom>,
    projection?: any,
    options?: QueryOptions,
  ): Promise<ClassroomsList> {
    const classrooms = await this.find(query, projection, options);
    const count = await this.count(query);
    return {
      classrooms,
      count,
    };
  }
}
