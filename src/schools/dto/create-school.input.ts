import { ArgsType, Field, ID, InputType } from '@nestjs/graphql';
// ${1 : PascalCase}

@InputType()
@ArgsType()
export class CreateSchoolInput {
  @Field()
  name!: string;

  @Field()
  logoPhoto!: string;

  @Field()
  address!: string;

  @Field({ description: 'Area code ex: Jakarta is 21' })
  areaCode!: string;

  @Field({ description: 'phone without area code' })
  phone!: string;
}
