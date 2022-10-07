import { ArgsType, Field, ObjectType } from "@nestjs/graphql";

@ArgsType()
@ObjectType()
export class QontakHeaderObject {
  @Field(() => String, { nullable: true })
  format?: string;

  @Field(() => String, { nullable: true })
  example?: string;
}