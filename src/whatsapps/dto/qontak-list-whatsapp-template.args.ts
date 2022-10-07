import { ArgsType, InputType, Field, ObjectType } from '@nestjs/graphql';

@InputType()
@ArgsType()
@ObjectType()
export class QontakListWhatsappTemplateArgs {
  @Field(() => Number, { nullable: true })
  limit?: number | undefined;

  @Field(() => Number, { nullable: true })
  offset?: number | undefined;

  @Field(() => String, {
    nullable: true,
    defaultValue: 'cs',
    description: 'default value cs',
  })
  query: string = 'cs';

  @Field(() => String, { nullable: true })
  status?: string | undefined;
}
