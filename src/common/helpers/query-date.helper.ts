import { FilterQuery } from "mongoose";

/**
 * @description - NOTE: This function should always run last if there any
 * process to transform the query
 *
 * This function will add dateQuery schedule ($gte, $lte) to the
 * parameter 'query' with field name according to the paramater 'fieldName'
 */
export default function transformScheduleQuery(
  fieldName: string | '',
  dateQuery: {
    start?: Date;
    end?: Date;
  },
  query: Record<any, any>
) {
  let rangeQuery: FilterQuery<any> = {};
  const normalQuery: FilterQuery<any> = {
    // status: VisitStatusEnum.INCOMPLETE,
    ...query,
  };
  let finalQuery: Record<any, any>;
  let fieldNameQuery = fieldName ? `${fieldName}.` : '';
  if (dateQuery?.start) {
    normalQuery[`${fieldNameQuery}start`] = { $gte: dateQuery.start };
  }
  if (dateQuery?.end) {
    normalQuery[`${fieldNameQuery}end`] = { $lte: dateQuery.end };
  }
  if (!dateQuery?.start && !dateQuery?.end) {
    normalQuery[`${fieldNameQuery}start`] = { $lte: new Date() };
    normalQuery[`${fieldNameQuery}end`] = { $gte: new Date() };
  }
  if (dateQuery?.start && dateQuery?.end) {
    rangeQuery = {
      $or: [
        {
          ...query,
          [`${fieldNameQuery}start`]: {
            $gte: dateQuery?.start,
            $lte: dateQuery?.end,
          },
        },
        {
          ...query,
          [`${fieldNameQuery}end`]: {
            $gte: dateQuery?.start,
            $lte: dateQuery?.end,
          },
        },
      ],
    };
    finalQuery = { ...rangeQuery };
  } else {
    finalQuery = { ...normalQuery };
  }
  return finalQuery;
}
