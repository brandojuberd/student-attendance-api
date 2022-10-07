import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, QueryOptions } from 'mongoose';
import { Service } from 'src/common/services/base-service.service';
import { UsersList } from './dto/users-list.object';
import { User } from './entities/users.entity';
// import { SolutionProcedureVariant } from './classes/solution-procedure-variants.schema';
// ${1 : PascalCase}
// ${2 : camelCase}
@Injectable()
export class UsersService extends Service<
 User 
> {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
  ) {
    super(userModel);
  }

  async getUsersList(
    query: FilterQuery<User>,
    projection?: any,
    options?: QueryOptions
  ): Promise<UsersList> {
    const users = await this.find(query, projection, options);
    const count = await this.count(query);
    return {
      users,
      count,
    };
  }
}
