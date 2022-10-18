import { ArgsType, InputType, Field, ObjectType } from '@nestjs/graphql';
import { PaginationArgs } from 'src/common/dto/pagination.args.';
import { ObjectIdScalar } from 'src/common/graphql/scalars/object-id.scalars';
import { TypeObjectId } from 'src/common/helpers/mongoose.helper';
import { ClassroomGradeEnum } from '../entities/classroom-grade.enum';

// ${1 : PascalCase}
// This used for query
// DO NOT FORGET TO DELETE 'extends PaginationArgs' if it is not used
@ArgsType()
@InputType()
export class GetClassroomsArgs extends PaginationArgs {
  @Field(() => ObjectIdScalar, { nullable: true })
  school?: TypeObjectId;

  @Field(() => ClassroomGradeEnum, { nullable: true })
  grade?: ClassroomGradeEnum;

  @Field(() => String, { nullable: true })
  name?: string;
}
