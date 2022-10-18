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
import { CreateSchoolInput } from './dto/create-school.input';
import { GetSchoolsArgs } from './dto/get-schools.args';
import { SchoolsList } from './dto/schools-list.object';
import { UpdateSchoolInput } from './dto/update-school.input';
import { School } from './entities/school.entity';
import { SchoolsService } from './schools.service';

// ${1 : PascalCase}
// ${2 : camelCase}

@Resolver(() => School)
export class SchoolsResolver {
  //${1 : CapitalCase}
  //${2 : camelCase}
  constructor(private readonly schoolsService: SchoolsService) {}

  @Query(() => [School], { name: 'schools' })
  getSchools(
    @Args('query', { type: () => GetSchoolsArgs }) query: GetSchoolsArgs,
  ) {
    return this.schoolsService.find(query);
  }

  @Query(() => School, { name: 'school' })
  findSchoolById(
    @Args('schoolId', { type: () => ObjectIdScalar }) schoolId: TypeObjectId,
  ) {
    return this.schoolsService.findById(schoolId);
  }

  @Query(() => SchoolsList, { name: 'schoolsList' })
  getSchoolsList(
    @Args('query', { type: () => GetSchoolsArgs, nullable: true })
    query: GetSchoolsArgs,
    @Args('populate', {
      nullable: true,
      type: () => [PopulateInput],
      defaultValue: [],
    })
    populate: PopulateInput[],
    @Args('lean', { nullable: true, defaultValue: false }) lean: boolean,
  ) {
    return this.schoolsService.getSchoolsList(query);
  }

  @Mutation(() => School)
  schoolCreate(
    @Args('data', { type: () => CreateSchoolInput }) body: CreateSchoolInput,
  ) {
    return this.schoolsService.create(body);
  }

  @Mutation(() => School)
  schoolUpdate(
    @Args('schoolId', { type: () => ObjectIdScalar }) schoolId: TypeObjectId,
    @Args('data', { type: () => UpdateSchoolInput })
    data: UpdateSchoolInput, //update use same type
  ) {
    return this.schoolsService.findByIdAndUpdate(schoolId, data, {
      new: true,
    });
  }

  @Mutation(() => School)
  schoolDelete(
    @Args('schoolId', { type: () => ObjectIdScalar }) schoolId: TypeObjectId,
  ) {
    return this.schoolsService.findByIdAndDelete(schoolId);
  }

  /**
   * RESOLVE FIELD
   */
  //   @ResolveField('<fieldNameToPopulate>', () => ModelToPopulate)
  //   async <fieldNameToPopulate>Resolver(
  //     @Parent() school: School,
  //     @Args('populate', { nullable: true }) populate: boolean,
  //   ) {
  //     if (populate) await school.populate({ path: '<fieldNameToPopulate>' }).execPopulate();
  //     return school.<fieldNameToPopulate>;
  //   }

  //   @ResolveField('<field>', () => Enum)
  //   async <field>EnumResolver(
  //     @Parent() school: School,
  //   ) {
  //     return getEnumLabelAndValue(<field>Enum, school.<field>)
  //   }
}
