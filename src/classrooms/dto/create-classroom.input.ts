import { ArgsType, Field, ID, InputType } from '@nestjs/graphql';
import { ObjectIdScalar } from 'src/common/graphql/scalars/object-id.scalars';
import { ObjectId, TypeObjectId } from 'src/common/helpers/mongoose.helper';
import { ClassroomGradeEnum } from '../entities/classroom-grade.enum';
// ${1 : PascalCase}

@InputType()
@ArgsType()
export class CreateClassroomInput {
  @Field(() => ObjectIdScalar)
  school!: TypeObjectId;

  @Field(() => ClassroomGradeEnum)
  grade!: ClassroomGradeEnum;

  @Field(() => String)
  name!: string;
}
