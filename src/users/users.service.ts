import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, QueryOptions } from 'mongoose';
import { Service } from 'src/common/services/base-service.service';
import { UsersList } from './dto/users-list.object';
import { User } from './entities/users.entity';
import bcrypt from 'bcrypt';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UsersService extends Service<User> {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
  ) {
    super(userModel);
  }

  private hashPassword = (password: string): string =>
    bcrypt.hashSync(password, 10);

  async createUser(data: CreateUserInput) {
    const userDoc = await this.findOne({
      email: data.email.toLowerCase(),
    });
    // /**
    //  * ROLE CHECK
    //  * ONLY ADMIN AND SUPER ADMIN CAN ADD ROLES OTHER THAN CUSTOMER
    //  * @todo: delete after createuserinput.role is deleted
    //  */
    // if (userContext?.role === UserRolesEnum.SuperAdmin) {
    // } else if (userContext?.role === UserRolesEnum.Admin) {
    // } else {
    //   // model will automatically assign role customer
    //   delete data.role;
    // }

    /**
     * DTO CHECK
     */
    if (userDoc)
      throw new BadRequestException('User dengan email ini sudah terdaftar.');

    data.password = this.hashPassword(data.password);
    const user = await this.create(data);

    return user;
  }

  async getUsersList(
    query: FilterQuery<User>,
    projection?: any,
    options?: QueryOptions,
  ): Promise<UsersList> {
    const users = await this.find(query, projection, options);
    const count = await this.count(query);
    return {
      users,
      count,
    };
  }
}
