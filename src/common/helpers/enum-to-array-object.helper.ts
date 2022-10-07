import { Field, ObjectType } from '@nestjs/graphql';

export type Descripted<T> = {
  [K in keyof T]: {
    readonly label: T[K];
    readonly value: string;
  };
}[keyof T];

@ObjectType()
export class Enum {
  @Field()
  label!: string;

  @Field()
  value!: string;
}

/**
 * Helper to produce an array of enum descriptors.
 * @param enumeration Enumeration object.
 * @param separatorRegex Regex that would catch the separator in your enum key.
 */
export function enumToDescriptedArray<T extends {}>(
  enumeration: T,
  //   separatorRegex: RegExp = /_/g,
): Descripted<T>[] {
  return (Object.keys(enumeration) as Array<keyof T>)
    .filter((key) => isNaN(Number(key)))
    .filter(
      (key) =>
        typeof enumeration[key] === 'number' ||
        typeof enumeration[key] === 'string',
    )
    .map((key) => ({
      label: enumeration[key],
      value: String(key), //.replace(separatorRegex, ' '),
    }));
}

export function getEnumLabelAndValue<T extends {}>(
  enumeration: T,
  value: string,
  //   separatorRegex: RegExp = /_/g,
) {
  // : Descripted<T>[]

  const returnedObject = Object.entries(enumeration)
    .filter(([backendLabel, clientLabel]) => {
      return clientLabel === value;
    })
    .map(([backendLabel, clientLabel]) => ({
      label: clientLabel,
      value: backendLabel,
    }));
  return returnedObject?.length > 0 && returnedObject[0];
}

export function convertEnumToValuesMap<T extends {}>(enumeration: T) {
  const transformedEntries: [string, any][] = Object.entries(enumeration).map(
    ([key, value]) => {
      return [key, { description: value }];
    },
  );
  return Object.fromEntries(transformedEntries);
}
