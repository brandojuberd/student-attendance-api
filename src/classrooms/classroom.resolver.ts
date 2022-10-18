import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PopulateInput } from 'src/common/dto/populate.input';
import { ObjectIdScalar } from 'src/common/graphql/scalars/object-id.scalars';
import { TypeObjectId } from 'src/common/helpers/mongoose.helper';
import { ClassroomsService } from './classrooms.service';
import { ClassroomsList } from './dto/classrooms-list.object';
import { CreateClassroomInput } from './dto/create-classroom.input';
import { GetClassroomsArgs } from './dto/get-classrooms.args';
import { UpdateClassroomInput } from './dto/update-classroom.input';
import { Classroom } from './entities/classroom.entity';

// ${1 : PascalCase}
// ${2 : camelCase}

@Resolver(() => Classroom)
export class ClassroomsResolver {
  //${1 : CapitalCase}
  //${2 : camelCase}
  constructor(private readonly classroomsService: ClassroomsService) {}

  @Query(() => [Classroom], { name: 'classrooms' })
  getClassrooms(
    @Args('query', { type: () => GetClassroomsArgs }) query: GetClassroomsArgs,
  ) {
    return this.classroomsService.find(query);
  }

  @Query(() => Classroom, { name: 'classroom' })
  findClassroomById(
    @Args('classroomId', { type: () => ObjectIdScalar })
    classroomId: TypeObjectId,
  ) {
    return this.classroomsService.findById(classroomId);
  }

  @Query(() => ClassroomsList, { name: 'classroomsList' })
  getClassroomsList(
    @Args('query', { type: () => GetClassroomsArgs, nullable: true })
    query: GetClassroomsArgs,
    @Args('populate', {
      nullable: true,
      type: () => [PopulateInput],
      defaultValue: [],
    })
    populate: PopulateInput[],
    @Args('lean', { nullable: true, defaultValue: false }) lean: boolean,
  ) {
    return this.classroomsService.getClassroomsList(query);
  }

  @Mutation(() => Classroom)
  classroomCreate(
    @Args('data', { type: () => CreateClassroomInput })
    body: CreateClassroomInput,
  ) {
    return this.classroomsService.create(body);
  }

  @Mutation(() => Classroom)
  classroomUpdate(
    @Args('classroomId', { type: () => ObjectIdScalar })
    classroomId: TypeObjectId,
    @Args('data', { type: () => UpdateClassroomInput })
    data: UpdateClassroomInput, //update use same type
  ) {
    return this.classroomsService.findByIdAndUpdate(classroomId, data, {
      new: true,
    });
  }

  @Mutation(() => Classroom)
  classroomDelete(
    @Args('classroomId', { type: () => ObjectIdScalar })
    classroomId: TypeObjectId,
  ) {
    return this.classroomsService.findByIdAndDelete(classroomId);
  }

  /**
   * RESOLVE FIELD
   */
  //   @ResolveField('<fieldNameToPopulate>', () => ModelToPopulate)
  //   async <fieldNameToPopulate>Resolver(
  //     @Parent() classroom: Classroom,
  //     @Args('populate', { nullable: true }) populate: boolean,
  //   ) {
  //     if (populate) await classroom.populate({ path: '<fieldNameToPopulate>' }).execPopulate();
  //     return classroom.<fieldNameToPopulate>;
  //   }

  //   @ResolveField('<field>', () => Enum)
  //   async <field>EnumResolver(
  //     @Parent() classroom: Classroom,
  //   ) {
  //     return getEnumLabelAndValue(<field>Enum, classroom.<field>)
  //   }
}
