import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, QueryOptions } from 'mongoose';
import { UserContext } from 'src/common/interfaces/user-context.interface';
import { Service } from 'src/common/services/base-service.service';
import { SchoolsList } from './dto/schools-list.object';
import { School } from './entities/school.entity';
// import { SolutionProcedureVariant } from './classes/solution-procedure-variants.schema';

// ${1 : PascalCase}
// ${2 : camelCase}
@Injectable()
export class SchoolsService extends Service<School> {
  constructor(
    @InjectModel('School')
    private readonly schoolModel: Model<School>,
  ) {
    super(schoolModel);
  }

  async getSchoolsList(
    query: FilterQuery<School>,
    projection?: any,
    options?: QueryOptions,
  ): Promise<SchoolsList> {
    const schools = await this.find(query, projection, options);
    const count = await this.count(query);
    return {
      schools,
      count,
    };
  }
}
