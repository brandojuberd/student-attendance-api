import { ArgsType, InputType, Field, ObjectType } from '@nestjs/graphql';
import { DateRangeArgs } from 'src/common/dto/date-range.args';
import { ObjectIdScalar } from 'src/common/graphql/scalars/object-id.scalars';

// ${1 : PascalCase}
// This used for query
// DO NOT FORGET TO DELETE 'extends PaginationArgs' if it is not used
@ArgsType()
@InputType()
export class GetStudentAttendancesArgs {
  @Field(() => ObjectIdScalar, { nullable: true })
  student?: string;

  @Field(() => DateRangeArgs, { nullable: true })
  dateRange?: DateRangeArgs;
}