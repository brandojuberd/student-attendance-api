import { registerEnumType } from '@nestjs/graphql';
import { convertEnumToValuesMap } from 'src/common/helpers/enum-to-array-object.helper';

// ${1 : 'ModelKey' name ex: EmployeeRole}

export enum UserRoleEnum {
  SuperAdmin = 'SuperAdmin',
  Admin = 'Admin',
  Teacher = 'Teacher',
}

registerEnumType(UserRoleEnum, {
  name: 'UserRoleEnum',
  valuesMap: convertEnumToValuesMap(UserRoleEnum),
});
