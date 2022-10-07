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
import { CreateStudentAttendanceInput } from './dto/create-student-attendance.input';
import { GetStudentAttendancesArgs } from './dto/get-student-attendances-args';
import { StudentAttendanceUpdateObject } from './dto/student-attendance-create.object';
import { StudentAttendancesList } from './dto/student-attendance-lists.object';
import { UpdateStudentAttendanceInput } from './dto/update-student-attendance.input';
import { StudentAttendance } from './entities/student-attendance.entity';
import { StudentAttendancesService } from './student-attendances.service';

// ${1 : PascalCase}
// ${2 : camelCase}

@Resolver(() => StudentAttendance)
export class StudentAttendancesResolver {
  //${1 : CapitalCase}
  //${2 : camelCase}
  constructor(
    private readonly studentAttendancesService: StudentAttendancesService,
  ) {}

  // @Query(() => [StudentAttendance], { name: 'studentAttendances' })
  // getStudentAttendances(
  //   @Args('query', { type: () => GetStudentAttendancesArgs}) query: GetStudentAttendancesArgs
  // ) {
  //   return this.studentAttendancesService.find(query);
  // }

  @Query(() => StudentAttendance, { name: 'studentAttendance' })
  findStudentAttendanceById(
    @Args('studentAttendanceId', { type: () => ObjectIdScalar })
    studentAttendanceId: TypeObjectId,
  ) {
    // findStudentAttendance(@Args() query: GetStudentAttendancesArgs) {
    return this.studentAttendancesService.findById(studentAttendanceId);
  }

  @Query(() => StudentAttendancesList, { name: 'studentAttendancesList' })
  getStudentAttendancesList(
    @Args('query', { nullable: true, type: () => GetStudentAttendancesArgs })
    query: GetStudentAttendancesArgs,
    @Args('populate', {
      nullable: true,
      type: () => [PopulateInput],
      defaultValue: [],
    })
    populate: PopulateInput[],
    @Args('lean', { nullable: true, defaultValue: false }) lean: boolean,
  ) {
    return this.studentAttendancesService.getStudentAttendancesList(
      query,
      {},
      { populate, lean },
    );
  }

  @Mutation(() => StudentAttendanceUpdateObject)
  studentAttendanceCreate(
    @Args('data', { type: () => CreateStudentAttendanceInput })
    body: CreateStudentAttendanceInput,
  ) {
    return this.studentAttendancesService.createStudentAttendance(body);
  }

  @Mutation(() => StudentAttendance)
  studentAttendanceUpdate(
    @Args('studentAttendanceId', { type: () => ObjectIdScalar })
    studentAttendanceId: TypeObjectId,
    @Args('data', { type: () => UpdateStudentAttendanceInput })
    data: UpdateStudentAttendanceInput, //update use same type
  ) {
    return this.studentAttendancesService.findByIdAndUpdate(
      studentAttendanceId,
      data,
      {
        new: true,
      },
    );
  }

  @Mutation(() => StudentAttendanceUpdateObject)
  studentAttendanceCheckout(
    @Args('studentId', { type: () => ObjectIdScalar })
    studentId: TypeObjectId,
  ) {
    return this.studentAttendancesService.checkoutStudent(
      studentId
    );
  }


  @Mutation(() => StudentAttendance)
  studentAttendanceDelete(
    @Args('studentAttendanceId', { type: () => ObjectIdScalar })
    studentAttendanceId: TypeObjectId,
  ) {
    return this.studentAttendancesService.findByIdAndDelete(
      studentAttendanceId,
    );
  }

  /**
   * RESOLVE FIELD
   */
  //   @ResolveField('<fieldNameToPopulate>', () => ModelToPopulate)
  //   async <fieldNameToPopulate>Resolver(
  //     @Parent() studentAttendance: StudentAttendance,
  //     @Args('populate', { nullable: true }) populate: boolean,
  //   ) {
  //     if (populate) await studentAttendance.populate({ path: '<fieldNameToPopulate>' }).execPopulate();
  //     return studentAttendance.<fieldNameToPopulate>;
  //   }

  //   @ResolveField('<field>', () => Enum)
  //   async <field>EnumResolver(
  //     @Parent() studentAttendance: StudentAttendance,
  //   ) {
  //     return getEnumLabelAndValue(<field>Enum, studentAttendance.<field>)
  //   }
}
