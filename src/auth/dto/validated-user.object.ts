import { ArgsType, InputType, Field, ObjectType } from '@nestjs/graphql';
import { ObjectIdScalar } from 'src/common/graphql/scalars/object-id.scalars';
import { TypeObjectId } from 'src/common/helpers/mongoose.helper';

@ObjectType()
export class ValidatedUser {
  @Field()
  accessToken!: string;

  @Field(() => ObjectIdScalar)
  _id!: TypeObjectId;

  @Field(() => String)
  username!: string;

  @Field(() => String)
  email!: string;

  @Field(() => String)
  role!: string;
}
