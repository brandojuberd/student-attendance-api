import { registerEnumType } from '@nestjs/graphql';
import { convertEnumToValuesMap } from 'src/common/helpers/enum-to-array-object.helper';

// ${1 : 'ModelKey' name ex: EmployeeRole}

export enum ClassroomGradeEnum {
  'Nine' = 'Nine',
  'Eight' = 'Eight',
  'Seven' = 'Seven',
}

//enum list PascalCase
// ex:  PartnerAdmin = 'PartnerAdmin',

registerEnumType(ClassroomGradeEnum, {
  name: 'ClassroomGradeEnum',
  valuesMap: convertEnumToValuesMap(ClassroomGradeEnum),
});
