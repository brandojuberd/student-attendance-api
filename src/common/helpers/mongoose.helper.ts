import { Schema, Types } from 'mongoose';

/**
 * Use this for type when create schema for Mongoose.
 * Equal to mongoose.Schema.Types.ObjectId,
 * To generate an ObjectId use TypeObjectId
 * ex: @Prop({type: ObjectId})
 */
export const ObjectId = Schema.Types.ObjectId;

/**
 * @deprecated use TypeObjectId field instead
 *
 * Use this for type check or to generate an ObjectId
 * Equal to mongoose.Types.ObjectId
 */
export const QueryObjectId = Types.ObjectId;
/**
 * Use this for type check or to generate an ObjectId
 * Equal to mongoose.Types.ObjectId
 */
export class TypeObjectId extends Types.ObjectId {}

// export const regexObj = (
//   obj = {},
//   options: { caseSensitive: boolean } = { caseSensitive: false }
// ): object => {
//   const pairs = Object.entries(obj);
//   if (pairs.length !== 0) {
//     const key = pairs[0][0];
//     const value = pairs[0][1];
//     const { caseSensitive = false } = options;
//     if (caseSensitive) return value && { [key]: { $regex: value } };
//     return value && { [key]: { $regex: value, $options: 'i' } };
//   }
//   return;
// };

// export const parseSortString = (sort_string = ''): Record<string, string> => {
//   if (!sort_string) return {};
//   if (typeof sort_string !== 'string') return sort_string;
//   if (typeof sort_string === 'string' && sort_string.indexOf(':') < 0)
//     return {};

//   let sort_string_array = [];
//   if (typeof sort_string === 'string' && sort_string.indexOf('|') < 0)
//     sort_string_array = [sort_string];
//   else sort_string_array = sort_string.split('|');

//   const parsed_sort = {};
//   sort_string_array.forEach(sort_el => {
//     const [sort_key, sort_type] = sort_el.split(':');
//     parsed_sort[sort_key] = sort_type;
//   });
//   return parsed_sort;
// };

// export const parseSortStringNum = (sort_string = ''): Record<string, number> => {
//   if (!sort_string) return {};
//   if (typeof sort_string !== 'string') return sort_string;
//   if (typeof sort_string === 'string' && sort_string.indexOf(':') < 0)
//     return {};

//   let sort_string_array: string[] = [];
//   if (typeof sort_string === 'string' && sort_string.indexOf('|') < 0)
//     sort_string_array = [sort_string];
//   else sort_string_array = sort_string.split('|');

//   const parsed_sort: Record<string, number> = {};
//   sort_string_array.forEach(sort_el => {
//     const [sort_key, sort_type] = sort_el.split(':');
//     parsed_sort[sort_key] = Number.isNaN(sort_type) ? 1 : Number(sort_type);
//   });
//   return parsed_sort;
// };

// export function deleteEmptyOrUndefinedKeys<T>(obj: T): Partial<T> {
//   const tempObj = obj;
//   Object.keys(tempObj).forEach(key => {
//     const keyValueIsUndefined: boolean = tempObj[key] === undefined;
//     const keyValueIsNullish: boolean = tempObj[key] === null;
//     const keyValueIsFalsy = !tempObj[key];
//     if (keyValueIsUndefined || keyValueIsNullish || keyValueIsFalsy)
//       delete tempObj[key];
//   });
//   return tempObj;
// };
