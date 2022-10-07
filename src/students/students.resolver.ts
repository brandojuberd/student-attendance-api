import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Types } from 'mongoose';
import { ObjectIdScalar } from 'src/common/graphql/scalars/object-id.scalars';
import { CreateStudentInput } from './dto/create-student.input';
import { GetStudentsArgs } from './dto/get-students.args';
import { StudentsList } from './dto/students-list.object';
import { UpdateStudentInput } from './dto/update-student.input';
import { Student } from './entities/student.entity';
import { StudentsService } from './students.service';

// ${1 : PascalCase}
// ${2 : camelCase}

@Resolver(() => Student)
export class StudentsResolver {
  //${1 : CapitalCase}
  //${2 : camelCase}
  constructor(private readonly studentsService: StudentsService) {}

  @Query(() => [Student], { name: 'students' })
  getStudents(
    @Args('query', { type: () => GetStudentsArgs}) query: GetStudentsArgs
  ) {
    return this.studentsService.find(query);
  }

  @Query(() => Student, { name: 'student' })
  findStudentById(@Args('studentId', { type: () => ObjectIdScalar }) studentId: Types.ObjectId) {
  // findStudent(@Args() query: GetStudentsArgs) {
    return this.studentsService.findById(studentId);
  }


  @Query(() => StudentsList, { name: 'studentsList' })
  getStudentsList(
    @Args('query', { type: () => GetStudentsArgs}) query: GetStudentsArgs
  ) {
    return this.studentsService.getStudentsList(query);
  }

  @Mutation(() => Student)
  studentCreate(
    @Args('data', { type: () =>  CreateStudentInput}) body: CreateStudentInput
  ) {
    return this.studentsService.create(body);
  }

  @Mutation(() => Student)
  studentUpdate(
    @Args('studentId', { type: () => ObjectIdScalar }) studentId: Types.ObjectId,
    @Args('data', { type: () => UpdateStudentInput })
    data: UpdateStudentInput, //update use same type
  ) {
    return this.studentsService.findByIdAndUpdate(studentId, data, {
      new: true,
    });
  }

  @Mutation(() => Student)
  studentDelete(@Args('studentId', { type: () => ObjectIdScalar }) studentId: Types.ObjectId) {
    return this.studentsService.findByIdAndDelete(studentId);
  }

  /**
   * RESOLVE FIELD
   */
  //   @ResolveField('<fieldNameToPopulate>', () => ModelToPopulate)
  //   async <fieldNameToPopulate>Resolver(
  //     @Parent() student: Student,
  //     @Args('populate', { nullable: true }) populate: boolean,
  //   ) {
  //     if (populate) await student.populate({ path: '<fieldNameToPopulate>' }).execPopulate();
  //     return student.<fieldNameToPopulate>;
  //   }

  //   @ResolveField('<field>', () => Enum)
  //   async <field>EnumResolver(
  //     @Parent() student: Student,
  //   ) {
  //     return getEnumLabelAndValue(<field>Enum, student.<field>)
  //   }
  }
