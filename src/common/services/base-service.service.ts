import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  Aggregate,
  AnyKeys,
  ClientSession,
  Document,
  FilterQuery,
  HydratedDocument,
  InsertManyOptions,
  LeanDocument,
  Model,
  PipelineStage,
  PopulateOptions,
  ProjectionFields,
  QueryOptions,
  Require_id,
  SaveOptions,
  Types,
  UpdateQuery,
  UpdateWithAggregationPipeline,
} from 'mongoose';
// import { LoggerService } from 'src/modules/logging/logger.service';

/**
 * Abstract base service that other services can extend to provide base CRUD
 * functionality such as to create, find, update and delete data.
 */
@Injectable()
export abstract class Service<T> {
  readonly modelName: string = '';
  // private readonly baseStorageService: StorageService;
  //   private readonly serviceLogger: LoggerService;

  /**
   * The constructor must receive the injected model from the child service in
   * order to provide all the proper base functionality.
   *
   * @param {Logger} logger - The injected logger.
   * @param {Model} baseModel - The injected model.
   */
  constructor(private readonly baseModel: Model<T>) // logger?: LoggerService,
  // private readonly uploadEnumBaseService?: any[],
  // private readonly baseStorageService?: StorageService
  {
    // Services who extend this service already contain a property called
    // 'logger' so we will assign it to a different name.
    // this.serviceLogger = logger;
    // this.baseStorageService = storage;
    for (const modelName of Object.keys(baseModel.collection.conn.models)) {
      if (baseModel.collection.conn.models[modelName] === this.baseModel) {
        this.modelName = modelName;
        break;
      }
    }
  }

  // /**
  //  * @deprecated - use findOneV2
  //  * Find one entry and return the result.
  //  *
  //  * @throws InternalServerErrorException
  //  */
  // async findOne(
  //   conditions: FilterQuery<T> | Partial<Record<keyof T, unknown>>,
  //   projection: string | Record<string, unknown> = {},
  //   options: QueryOptions | null | Record<string, unknown> = {}
  //   // options: Record<string, unknown> = {}
  // ): Promise<T> {
  //   try {
  //     return await this.baseModel.findOne(
  //       {
  //         ...conditions,
  //         deletedAt: null,
  //       },
  //       projection,
  //       options
  //     );
  //   } catch (err) {
  //     //   this.serviceLogger.error(`Could not find ${this.modelName} entry:`);
  //     //   this.serviceLogger.error(err);
  //     throw new InternalServerErrorException(err);
  //   }
  // }

  /**
   * Find one entry and return the result.
   *
   * @throws InternalServerErrorException
   */
  findOne(
    conditions: FilterQuery<T> | Partial<Record<keyof T, unknown>>,
    projection: ProjectionFields<T> = {},
    options: QueryOptions | null | Record<string, unknown> = {},
  ) {
    return this.baseModel.findOne(
      {
        ...conditions,
        deletedAt: null,
      },
      projection,
      options,
    );
  }

  // /**
  //  * @deprecated use findV2
  //  * Find entries and return the result.
  //  * If there is no sort field in condition (param 1), the function will use sort in option (param 3)
  //  * @throws InternalServerErrorException
  //  */
  // async find(
  //   conditions, //: Partial<Record<keyof T | string, unknown>>,
  //   projection: string | Record<string, unknown> = {},
  //   options: QueryOptions = {}
  // ) {
  //   try {
  //     let {
  //       page = 1,
  //       limit = 10,
  //       sort,
  //       searchOptions,
  //       ...query
  //     } = conditions || {};
  //     limit = Number(limit);
  //     let skip = Number(limit) * (Number(page) - 1);

  //     if (sort) options.sort = parseSortString(sort);

  //     if ((searchOptions as SearchOptionsInput) && searchOptions?.searchText) {
  //       const { searchText, searchInFields } = searchOptions;
  //       if (query.$or)
  //         query.$or = [
  //           ...query.$or,
  //           ...searchInFields.map((el) => regexObj({ [el]: searchText })),
  //         ];
  //       else
  //         query.$or = searchInFields.map((el) =>
  //           regexObj({ [el]: searchText })
  //         );
  //     }
  //     query.deletedAt = null;
  //     // add await to catch error
  //     return await this.baseModel.find(query as FilterQuery<T>, projection, {
  //       ...options,
  //       limit,
  //       skip,
  //     });
  //   } catch (err) {
  //     //   this.serviceLogger.error(`Could not find ${this.modelName} entry:`);
  //     //   this.serviceLogger.error(err);
  //     throw new InternalServerErrorException(err);
  //   }
  // }

  /**
   * Updated find method, return mongoose.Query
   * Usage:
   * @example
   *  // Two ways of usage
   *  await findV2(...).exec() // best practice
   *  await findV2()
   *
   * @param {*} conditions
   * @param {(string | Record<string, unknown>)} [projection={}]
   * @param {QueryOptions} [options={}]
   * @return {*}
   * @memberof Service
   */
  find(
    conditions: FilterQuery<T>,
    projection: ProjectionFields<T> = {},
    options: QueryOptions<T> = {},
  ) {
    try {
      // const {
      //   page = 1,
      //   limit = 10,
      //   sort,
      //   searchOptions,
      //   ...query
      // } = conditions;
      // options.limit = Number(limit);
      // options.skip = Number(limit) * (Number(page) - 1);
      // options.sort = sort ? parseSortString(sort) : undefined;
      // const finalQuery: FilterQuery<
      //   Omit<
      //     T & {
      //       page?: number;
      //       limit?: number;
      //       sort?: string;
      //       searchOptions?: {
      //         searchInFields: string[];
      //         searchText: string;
      //       };
      //     },
      //     'page' | 'limit' | 'sort' | 'searchOptions'
      //   >
      // > = query;
      // if ((searchOptions as SearchOptionsInput) && searchOptions?.searchText) {
      //   const { searchText, searchInFields } = searchOptions;
      //   if (finalQuery.$or)
      //     finalQuery.$or = [
      //       ...finalQuery.$or,
      //       ...searchInFields.map((el) => regexObj({ [el]: searchText })),
      //     ];
      //   else
      //     finalQuery.$or = searchInFields.map((el) =>
      //       regexObj({ [el]: searchText })
      //     );
      // }
      return this.baseModel.find(
        {
          ...conditions,
          deletedAt: null,
        },
        projection,
        options,
      );
    } catch (err) {
      //   this.serviceLogger.error(`Could not find ${this.modelName} entry:`);
      //   this.serviceLogger.error(err);
      throw new InternalServerErrorException(err);
    }
  }

  // /**
  //  * @deprecated use findByIdV2
  //  * Find entry and return the result.
  //  *
  //  * @throws InternalServerErrorException
  //  */
  // async findById(
  //   _id: any,
  //   projection: string | Record<string, unknown> = {},
  //   options: QueryOptions | null | Record<string, unknown> = {}
  // ) {
  //   try {
  //     const doc = await this.baseModel.findOne(
  //       {
  //         _id,
  //         deletedAt: null,
  //       },
  //       projection,
  //       options
  //     );
  //     // return doc
  //     if (!doc)
  //       throw new NotFoundException(
  //         `Dokumen ${this.modelName} tidak ditemukan.`
  //       );
  //     return doc;
  //   } catch (err) {
  //     // this.serviceLogger.error(`Could not find ${this.modelName} entry:`);
  //     //   this.serviceLogger.error(err);
  //     if (err.status === 404) throw new NotFoundException(err.message);
  //     throw new InternalServerErrorException(err.message);
  //   }
  // }

  findById(
    _id: Types.ObjectId,
    projection: ProjectionFields<T> = {},
    options: QueryOptions<T> = {},
  ) {
    try {
      const doc = this.baseModel.findOne(
        {
          _id: _id, // Typing error, either from mongoose or our BaseService<Doccument> typing
          deletedAt: null,
        },
        projection,
        options,
      );
      return doc;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  // /**
  //  * @deprecated use createV2
  //  * Add new doc and return the result.
  //  *
  //  * @throws InternalServerErrorException
  //  */
  // async create(
  //   doc: AnyKeys<T> | T,
  //   options: Record<string, unknown> = {}
  // ): Promise<HydratedDocument<T>> {
  //   try {
  //     // const newDoc = new this.baseModel(doc);
  //     // return newDoc.save(options);
  //     const res = await this.baseModel.create([doc], options);
  //     return res[0];
  //   } catch (err) {
  //     //   this.serviceLogger.error(`Could not find ${this.modelName} entry:`);
  //     //   this.serviceLogger.error(err);
  //     throw new InternalServerErrorException(err);
  //   }
  // }

  async create(doc: AnyKeys<T> | T, options: SaveOptions = {}) {
    try {
      const res = await this.baseModel.create([doc], options);
      return res[0];
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  // async createWithUpload(
  //   data: CreateWithUploadInput<T>,
  //   options: QueryOptions = {}
  // ) {
  //   let { uploads, ...newData } = data;
  //   // newData as Record<keyof T, unknown>
  //   if (uploads && uploads.length > 0) {
  //     if (this.uploadEnumBaseService?.length === 0) {
  //       throw new InternalServerErrorException(
  //         'To use upload method please define uploads enum'
  //       );
  //     }
  //     this.checkUploadField(uploads, this.uploadEnumBaseService);
  //     newData = await this.baseStorageService.uploadMultipleGqlFiles(data);
  //   }
  //   return this.create(newData as Record<keyof T, unknown>, options);
  // }

  async insertMany(docs: AnyKeys<T>[], options: InsertManyOptions = {}) {
    try {
      const insertedDocs = await this.baseModel.insertMany(docs, options);
      return insertedDocs;
    } catch (err) {
      //   this.serviceLogger.error(`Could not find ${this.modelName} entry:`);
      //   this.serviceLogger.error(err);
      throw new InternalServerErrorException(err);
    }
  }

  // private sanitizeFileUploadName(dto: object) {
  //   for (let i = 0; i < this.uploadEnumBaseService?.length; i++) {
  //     let uploadEnumField = this.uploadEnumBaseService[i].field;
  //     let pickValue = dotHelper.pick(uploadEnumField, dto);

  //     //for fieldType: single. pickValue is string
  //     if (pickValue && typeof pickValue === 'string') {
  //       let publicURL = this.baseStorageService.generateSanitizeUrl(pickValue);
  //       dotHelper.set(uploadEnumField, publicURL, dto);

  //       //for fieldType: multi. pickValue is array of string. NOTE: null is considered typeof 'object'
  //     } else if (
  //       pickValue &&
  //       typeof pickValue === 'object' &&
  //       pickValue.length > 0
  //     ) {
  //       let sanitizeFields = [];
  //       for (let key in pickValue) {
  //         let publicURL = this.baseStorageService.generateSanitizeUrl(
  //           pickValue[key]
  //         );
  //         sanitizeFields.push(publicURL);
  //       }
  //       dotHelper.set(uploadEnumField, sanitizeFields, dto);
  //     }
  //   }
  // }

  // /**
  //  * @deprecated use findByIdAndUpdateV2
  //  * Update doc and return the result.
  //  *
  //  * @throws InternalServerErrorException
  //  */
  // async findByIdAndUpdate(
  //   docId: any,
  //   // updateDto: UpdateQuery<T> = {}, // Error Object ID from key Points
  //   updateDto = {},
  //   options: Record<string, unknown> = { new: true }
  // ): Promise<T> {
  //   try {
  //     this.sanitizeFileUploadName(updateDto);

  //     return await this.baseModel.findByIdAndUpdate(docId, updateDto, {
  //       new: true,
  //       ...options,
  //     });
  //   } catch (err) {
  //     //   this.serviceLogger.error(`Could not find ${this.modelName} entry:`);
  //     //   this.serviceLogger.error(err);
  //     console.warn(err);
  //     throw new InternalServerErrorException(err);
  //   }
  // }

  findByIdAndUpdate(
    docId: Types.ObjectId | string,
    updateDto: UpdateQuery<T>,
    options: QueryOptions = { new: true },
  ) {
    try {
      return this.baseModel.findByIdAndUpdate(docId, updateDto, {
        new: true,
        ...options,
      });
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  // /**
  //  * Update a doc, also handle upload.
  //  * @param docId docId in respestive model
  //  * @param updateDto  update DTO
  //  * @param options options for mongodb method
  //  * @returns  updated document with uploaded urls
  //  */
  // async findByIdAndUpdateWithUpload(
  //   docId: any,
  //   updateDto: UpdateQuery<T> = {}, // error when add key to UpdateType
  //   // updateDto,
  //   options: Record<string, unknown> = { new: true }
  // ): Promise<T> {
  //   this.sanitizeFileUploadName(updateDto);

  //   let { uploads, ...newData } = updateDto;
  //   const existingData = await this.findById(
  //     docId,
  //     {},
  //     { ...options, lean: false }
  //   ); // Don't delete 'lean', because code below used mongooseDoc.toObject func
  //   // const dotted = dotHelper.dot(existingData);
  //   // get images that already saved on database
  //   if (!this.uploadEnumBaseService)
  //     throw new InternalServerErrorException(
  //       "Please define uploadFieldEnum and insert to super argument in model's service"
  //     );

  //   if (uploads) {
  //     await this.checkUploadField(uploads, this.uploadEnumBaseService);
  //     //check uploads field and upload to gc
  //     newData = await this.baseStorageService.uploadMultipleGqlFiles(updateDto); // immediately upload
  //     // upload to gc, then add link to key "images"
  //   }
  //   this.uploadEnumBaseService.forEach(async (uploadField) => {
  //     const fieldFromDatabase = dotHelper.dot(existingData.toObject())[
  //       uploadField.field
  //     ];
  //     // Boolean(fieldBeforeUpdate) === false, if there is no link/file in database doc

  //     const isFieldExistInUpdateDto: boolean = dotHelper
  //       .dot(updateDto)
  //       .hasOwnProperty(uploadField.field);

  //     const fieldAfterUploading = dotHelper.dot(newData)[uploadField.field];
  //     // Boolean(fieldAfterUpdate) === false, if there is no upload

  //     if (uploadField.fieldType === UploadFieldTypeEnum.single) {
  //       if (
  //         isFieldExistInUpdateDto &&
  //         fieldFromDatabase &&
  //         !fieldAfterUploading
  //       ) {
  //         // ex: "", null, undefined
  //         // not send a new uploads but deleting old file
  //         const result = await this.baseStorageService.deleteFile(
  //           fieldFromDatabase
  //         );
  //       } else if (
  //         fieldFromDatabase &&
  //         fieldAfterUploading &&
  //         fieldFromDatabase !== fieldAfterUploading
  //       ) {
  //         // send a new uploads
  //         const result = await this.baseStorageService.deleteFile(
  //           fieldFromDatabase
  //         );
  //       }
  //     } else if (
  //       uploadField.fieldType === UploadFieldTypeEnum.multi &&
  //       fieldFromDatabase &&
  //       fieldFromDatabase.length !== 0 &&
  //       fieldAfterUploading
  //     ) {
  //       await this.baseStorageService.deleteFileOnUpdate(
  //         fieldFromDatabase,
  //         fieldAfterUploading
  //       ); // delete unused images from googleCloud
  //     }
  //     // }
  //   });
  //   // const dotted = dotHelper.dot(newData)
  //   // const dotObj = dotHelper.object(dotted);
  //   return await this.findByIdAndUpdate(docId, newData, {
  //     ...options,
  //     new: true,
  //   });
  // }

  /**
   * findByIdAndDelete: find document and delete existing uploaded files,
   * based on uploadFieldsEnum.
   * @returns deletedFile,
   * @throws InternalServerErrorException
   */
  async findByIdAndDelete(
    _id: Types.ObjectId,
    options: Record<string, unknown> = {},
  ) {
    try {
      //? IF StorageService is not included, cannot delete file
      // if (this.baseStorageService) {
      //   const filesToBeDeleted = [];
      //   const existingDoc = await this.findById(_id);
      //   this.uploadEnumBaseService.forEach(async (upload) => {
      //     const fieldFromDatabase = dotHelper.dot(existingDoc.toObject())[
      //       upload.field
      //     ];
      //     if (upload.fieldType === UploadFieldTypeEnum.multi) {
      //       await this.baseStorageService.deleteMultipleFiles(
      //         fieldFromDatabase
      //       );
      //     } else if (fieldFromDatabase) {
      //       filesToBeDeleted.push(fieldFromDatabase);
      //     }
      //   });
      //   if (filesToBeDeleted.length > 0) {
      //     await this.baseStorageService.deleteMultipleFiles(filesToBeDeleted);
      //   }
      // }

      return await this.baseModel.findByIdAndDelete(_id, options);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  // /**
  //  * Delete many Docs and return the result.
  //  *
  //  * @throws InternalServerErrorException
  //  */
  // async remove(
  //   _ids: (string | TypeObjectId)[],
  //   // update: UpdateQuery<T> = {},
  //   options: Record<string, unknown> = {} // : Promise<{ ok?: number; n?: number; } & { deletedCount?: number; }>
  // ): Promise<unknown> {
  //   // need to declare return types, currently mongoose use type from mongodb so we cannot get the type
  //   try {
  //     // return this.baseModel.remove({ _id: { $in: _ids } }); // deprecated
  //     return await this.baseModel.deleteMany(
  //       { _id: { $in: _ids } } as FilterQuery<T>,
  //       options
  //     ); // ts bug. https://github.com/DefinitelyTyped/DefinitelyTyped/issues/39358
  //   } catch (err) {
  //     //   this.serviceLogger.error(`Could not find ${this.modelName} entry:`);
  //     //   this.serviceLogger.error(err);
  //     throw new InternalServerErrorException();
  //   }
  // }

  // async updateMany(
  //   conditions: Partial<Record<keyof T | string, unknown>>,
  //   updateManyDto: UpdateQuery<T> = {},
  //   options: Record<string, unknown> = {}
  // ): Promise<unknown> {
  //   // need to declare return types, currently mongoose use type from mongodb so we cannot get the type
  //   try {
  //     return await this.baseModel.updateMany(
  //       conditions as FilterQuery<T>,
  //       updateManyDto,
  //       options
  //     );
  //   } catch (err) {
  //     //   this.serviceLogger.error(`Could not find ${this.modelName} entry:`);
  //     //   this.serviceLogger.error(err);
  //     throw new InternalServerErrorException();
  //   }
  // }

  // /**
  //  * Update if _id exists or insert doc and return the result.
  //  *
  //  * @throws InternalServerErrorException
  //  */
  // async upsertOne(
  //   doc: Partial<Record<keyof T, any>> & { _id?: TypeObjectId | string },
  //   options: Record<string, any> = {}
  // ): Promise<T> {
  //   try {
  //     const { _id: docId, ...omitDoc } = doc;
  //     if (docId) {
  //       return await this.findByIdAndUpdate(
  //         docId,
  //         omitDoc as UpdateQuery<T>,
  //         options
  //       );
  //     } else {
  //       return await this.create(omitDoc as any);
  //     }
  //   } catch (err) {
  //     //   this.serviceLogger.error(`Could not find ${this.modelName} entry:`);
  //     //   this.serviceLogger.error(err);
  //     throw new InternalServerErrorException(err);
  //   }
  // }

  // /**
  //  * Upsert multiple docs and return the result.
  //  *
  //  * @returns Promise<T[]>
  //  * @throws InternalServerErrorException
  //  */
  // async upsertMany(
  //   docs: Partial<Record<keyof T, any>>[] = [],
  //   options: Record<string, any> = {}
  // ): Promise<T[]> {
  //   try {
  //     // return Promise.all(docs.map(doc => this.upsertOne(doc, options)));
  //     let result = [];
  //     for (let i = 0; i < docs.length; i++) {
  //       const doc = docs[i];
  //       result.push(await this.upsertOne(doc, options));
  //     }
  //     return result;
  //   } catch (err) {
  //     //   this.serviceLogger.error(`Could not find ${this.modelName} entry:`);
  //     //   this.serviceLogger.error(err);
  //     throw new InternalServerErrorException();
  //   }
  // }

  async count(
    conditions: any = {}, //: Partial<Record<keyof T | string, unknown>>,
    projection: string | Record<string, unknown> = {},
    options: Record<string, unknown> = {},
  ): Promise<number> {
    try {
      const {
        // //? remove general key for find args
        // page, // eslint-disable-line @typescript-eslint/no-unused-vars
        // limit, // eslint-disable-line @typescript-eslint/no-unused-vars
        // sort, // eslint-disable-line @typescript-eslint/no-unused-vars
        // searchOptions, // eslint-disable-line @typescript-eslint/no-unused-vars
        ...query
      } = conditions;

      // if ((searchOptions as SearchOptionsInput) && searchOptions?.searchText) {
      //   const { searchText, searchInFields } = searchOptions;
      //   query.$or = searchInFields.map((el) => regexObj({ [el]: searchText }));
      // }

      return await this.baseModel
        .find(query as FilterQuery<T>, projection, options)
        .countDocuments();
      // return this.baseModel.countDocuments(query)
    } catch (err) {
      //   this.serviceLogger.error(`Could not find ${this.modelName} entry:`);
      //   this.serviceLogger.error(err);
      throw new InternalServerErrorException();
    }
  }

  // async aggregate<R>(pipelines: PipelineStage[] = []): Promise<Aggregate<R[]>> {
  //   try {
  //     if (pipelines.length === 0) return [];
  //     else return await this.baseModel.aggregate(pipelines);
  //   } catch (err) {
  //     //   this.serviceLogger.error(`Could not find ${this.modelName} entry:`);
  //     //   this.serviceLogger.error(err);
  //     throw new InternalServerErrorException(err);
  //   }
  // }

  // async aggregateValuesFor(objectKey, pipelines = [{ $match: {} }], options?) {
  //   const aggregationKey = objectKey === '_id' ? '__id' : objectKey;

  //   let aggregateArray = await this.baseModel.aggregate(
  //     [
  //       ...pipelines,
  //       {
  //         $group: {
  //           _id: null,
  //           [aggregationKey]: { $addToSet: `$${objectKey}` },
  //         },
  //       },
  //     ],
  //     options
  //   );
  //   if (aggregateArray.length === 0) return [];
  //   if (aggregateArray?.length > 0) aggregateArray = aggregateArray[0];
  //   const extractedKey = aggregateArray[aggregationKey];
  //   return extractedKey;
  // }

  // /**
  //  * All the function inside transactionWrapper that access database must use option session
  //  * in order to get created data that still not committed yet
  //  * Example: create data user A inside transactionWrapper, if there is query to find user A, it won't be found if
  //  * options {session} is not passed
  //  * Reference: https://stackoverflow.com/questions/53208132/mongodb-multi-document-transaction-reading-non-commited-data
  //  * @param onFullfiled
  //  * @param transactionOptions
  //  * @returns
  //  */
  // async transactionWrapper<P>(
  //   onFullfiled: (session: ClientSession) => Promise<P>,
  //   transactionOptions = {}
  // ): Promise<P> {
  //   const session = await this.baseModel.startSession();
  //   return new Promise<P>(async (resolve, reject) => {
  //     try {
  //       session.startTransaction(transactionOptions);
  //       const result = await onFullfiled(session);
  //       await session.commitTransaction();
  //       resolve(result);
  //     } catch (error) {
  //       await session.abortTransaction();
  //       reject(error);
  //     } finally {
  //       await session.endSession();
  //     }
  //   });
  // }

  // async checkUploadField(uploadFieldsDto, uploadFieldsEnum) {
  //   uploadFieldsDto.forEach((fieldSpec) => {
  //     const { field, fieldType } = fieldSpec;
  //     const respectiveEnum = uploadFieldsEnum.find(
  //       (fieldEnum) => fieldEnum.field === field
  //     );
  //     if (!respectiveEnum)
  //       throw new UnprocessableEntityException(
  //         `Invalid field, ${fieldSpec.field} are invalid`
  //       );
  //     if (fieldType !== respectiveEnum.fieldType)
  //       throw new UnprocessableEntityException(
  //         `Invalid fieldType, ${fieldSpec.field} field type is ${respectiveEnum.fieldType}`
  //       );
  //   });
  // }

  // queryDateRefactor(
  //   query: GetVisitsArgs,
  //   isStartOfDay: boolean,
  //   isStringFormat = false
  // ) {
  //   const scheduleQuery: { $lte?: Date | string; $gte?: Date | string } = {};
  //   const beforeDate = query.startBeforeDate;
  //   const afterDate = query.startAfterDate;

  //   if (isStartOfDay) {
  //     if (isStringFormat) {
  //       if (beforeDate)
  //         scheduleQuery['$lte'] = moment(beforeDate)
  //           .endOf('day')
  //           .format('YYYY-MM-DD');
  //       if (afterDate)
  //         scheduleQuery['$gte'] = moment(afterDate)
  //           .startOf('day')
  //           .format('YYYY-MM-DD');
  //     } else {
  //       if (beforeDate)
  //         scheduleQuery['$lte'] = moment(beforeDate).endOf('day').toDate();
  //       if (afterDate)
  //         scheduleQuery['$gte'] = moment(afterDate).startOf('day').toDate();
  //     }
  //   } else {
  //     if (beforeDate) scheduleQuery['$lte'] = beforeDate;
  //     if (afterDate) scheduleQuery['$gte'] = afterDate;
  //   }

  //   if (query.startBeforeDate) delete query.startBeforeDate;
  //   if (query.startAfterDate) delete query.startAfterDate;
  //   return scheduleQuery;
  // }

  // /**
  //  * KPI section
  //  */
  // async kpiAggregateAndCountByField(
  //   fieldName,
  //   options?: {
  //     timeGroup?: TimeGroupEnum;
  //     query?: any;
  //     masking?: any;
  //     lookup?: {
  //       from: string;
  //       foreignField: string;
  //       as?: string;
  //       setFieldAsId: string;
  //     };
  //   }
  // ) {
  //   const returnLookupQuery = (lookup?) => {
  //     if (!lookup)
  //       return [
  //         {
  //           $project: {
  //             value: `$_id`,
  //             count: '$count',
  //           },
  //         },
  //       ];
  //     const {
  //       from,
  //       foreignField,
  //       as = 'temporaryField',
  //       setFieldAsId,
  //     }: {
  //       from: string;
  //       // localField: string;
  //       fieldName;
  //       foreignField: string;
  //       as: string;
  //       setFieldAsId: string;
  //     } = lookup;
  //     const lookupObjects = [
  //       { $lookup: { from, localField: '_id', as, foreignField } },
  //       { $unwind: `$${as}` },
  //       {
  //         $project: {
  //           value: `$${as}.${setFieldAsId}`,
  //           count: '$count',
  //         },
  //       },
  //     ];
  //     return lookupObjects;
  //   };

  //   const returnMatchQuery = (rawQuery: any): any[] => {
  //     if (!rawQuery) return [];
  //     else {
  //       delete rawQuery.page;
  //       delete rawQuery.limit;
  //       delete rawQuery.sort;
  //       delete rawQuery.searchOptions;
  //       return [{ $match: rawQuery }];
  //     }
  //   };

  //   const aggregateQuery = [
  //     ...returnMatchQuery(options?.query),
  //     { $unwind: `$${fieldName}` },
  //     {
  //       $group: {
  //         _id: `$${fieldName}`,
  //         count: { $sum: 1 },
  //       },
  //     },
  //     ...returnLookupQuery(options?.lookup),
  //     {
  //       $sort: {
  //         value: 1,
  //       },
  //     },
  //   ];

  //   const aggregateByField = await this.aggregate(aggregateQuery);
  //   if (aggregateByField.length === 0) return [];
  //   if (options?.masking) {
  //     const { masking } = options;
  //     return aggregateByField.map((el: any) => {
  //       const { value } = el;
  //       return {
  //         ...el,
  //         value: masking[value?.toString()] || value,
  //       };
  //     });
  //   }
  //   return aggregateByField;
  // }

  // async kpiAggregateAndCountByFieldV2(
  //   fieldName,
  //   options?: {
  //     timeGroup?: TimeGroupEnum;
  //     query?: any;
  //     masking?: any;
  //     lookup?: {
  //       from: string;
  //       foreignField: string;
  //       as?: string;
  //       setFieldAsId: string;
  //     };
  //     // additionalGroupQuery?:any;
  //   }
  // ) {
  //   const returnMatchQuery = (rawQuery: any): any[] => {
  //     if (!rawQuery) return [];
  //     else {
  //       //? sanitize the input
  //       const sanitizedQuery = this.sanitizeQueryForAggregate(rawQuery);

  //       return [{ $match: sanitizedQuery }];
  //     }
  //   };

  //   const returnGroupQuery = (fieldName, options?) => {
  //     const timeGroup = options?.timeGroup;
  //     const timeGroupField = options?.timeGroupField || 'createdAt';
  //     let timeFormat;
  //     if (timeGroup === 'monthly') timeFormat = '%Y-%m';
  //     if (timeGroup === 'yearly') timeFormat = '%Y';

  //     const timeGroupAddFieldQuery = [
  //       {
  //         $addFields: {
  //           timeIdentifier: {
  //             $dateToString: {
  //               format: timeFormat,
  //               date: `$${timeGroupField}`,
  //             },
  //           },
  //         },
  //       },
  //     ];
  //     const groupQuery = [
  //       {
  //         $group: {
  //           _id: {
  //             groupingField: `$${fieldName}`,
  //             timeIdentifier: `$timeIdentifier`,
  //           },
  //           count: { $sum: 1 },
  //         },
  //       },
  //     ];

  //     if (timeGroup) return [...timeGroupAddFieldQuery, ...groupQuery];
  //     else return [...groupQuery];
  //   };

  //   const returnLookupQuery = (options) => {
  //     const { lookup } = options;

  //     if (!lookup)
  //       return [
  //         {
  //           $project: {
  //             value: `$_id.groupingField`,
  //             count: '$count',
  //             timeGroup: options.timeGroup,
  //             timeIdentifier: '$_id.timeIdentifier',
  //           },
  //         },
  //       ];

  //     const {
  //       from,
  //       foreignField,
  //       as = 'temporaryField',
  //       setFieldAsId,
  //     }: {
  //       from: string;
  //       // localField: string;
  //       fieldName;
  //       foreignField: string;
  //       as: string;
  //       setFieldAsId: string;
  //     } = lookup;
  //     const lookupObjects = [
  //       {
  //         $lookup: { from, localField: '_id.groupingField', as, foreignField },
  //       },
  //       { $unwind: `$${as}` },
  //       {
  //         $project: {
  //           value: `$${as}.${setFieldAsId}`,
  //           count: '$count',
  //           timeGroup: options.timeGroup,
  //           timeIdentifier: '$_id.timeIdentifier',
  //           lookupId: `$${as}._id`,
  //           lookupModel: `${from}`,
  //         },
  //       },
  //     ];
  //     return lookupObjects;
  //   };

  //   const aggregateQuery = [
  //     ...returnMatchQuery(options?.query),
  //     ...returnGroupQuery(fieldName, options),
  //     ...returnLookupQuery(options),
  //     {
  //       $sort: {
  //         timeIdentifier: -1,
  //         value: 1,
  //       },
  //     },
  //   ];

  //   const aggregateByField = await this.aggregate(aggregateQuery);
  //   if (aggregateByField.length === 0) return [];
  //   if (options?.masking) {
  //     const { masking } = options;
  //     return aggregateByField.map((el: any) => {
  //       const { value } = el;
  //       return {
  //         ...el,
  //         value: masking[value?.toString()] || value,
  //       };
  //     });
  //   }
  //   return aggregateByField;
  // }

  // /**
  //  * Used to populate field
  //  * if 'doc' is not mongoose documents then use findById to get mongoose document and chain with Document.populate()
  //  * usually used in resolveField
  //  * solve lean document from aggregate
  //  */
  // async populateField(doc: T & Document, path: string): Promise<any> {
  //   if (doc?.populate) await doc.populate([{ path: path }]);
  //   else {
  //     doc = await this.findById(doc._id, { [path]: 1 }, { populate: path });
  //     await doc.populate([{ path: path }]);
  //   }
  //   return doc[path];
  // }

  // /**
  //  * @description - Used for populate field and combine field type using operator '&'. <Paths> is type that contain type of keys that will be populated, and will be coombined with <T> or documents
  //  */
  // async populateDoc<Paths>(
  //   doc: T & Document,
  //   path: string,
  //   options?: QueryOptions
  // ) {
  //   return doc.populate<Paths>({
  //     path,
  //     options,
  //   });
  // }

  // /**
  //  * @description - Used for populate field on array of docs and combine field type using operator '&'. <Paths> is type that contain type of keys that will be populated, and will be coombined with <T> or documents
  //  */
  // async populateDocs<Paths>(
  //   docs: (T & Document[]) | HydratedDocument<T>[],
  //   paths
  // ): Promise<(T & Paths)[]> {
  //   return this.baseModel
  //     .find({
  //       _id: {
  //         $in: docs.map((d) => d._id),
  //       },
  //     })
  //     .populate(paths);
  // }

  // /**
  //  * @description - Used to check if there is any change on snapshot key. and return object that contain snapshot field
  //  * */
  // async checkSnapshot(
  //   docId: TypeObjectId,
  //   inputData,
  //   snapshotFieldName: string
  // ) {
  //   // remove all null/undefined value
  //   const omittedSnapshot = _.omitBy(inputData, _.isNil);
  //   // check if snapshot keys empty
  //   const isSnapshotEmpty = _.isEmpty(omittedSnapshot);
  //   // if empty do not snapshot the keys else snapshot keys
  //   let snapshotInput = {};
  //   if (!isSnapshotEmpty) {
  //     const currentDoc = await this.findById(docId, {}, { lean: true });
  //     snapshotInput = {
  //       [snapshotFieldName]: currentDoc,
  //     };
  //   }
  //   return snapshotInput;
  // }

  // /**
  //  * Sanitize query, specifically paginations query,
  //  * to prepare query for aggregate pipelines.
  //  * Aggregate pipelines usually does not need paginations field.
  //  * @param rawQuery query with paginations
  //  * @returns query without pagination fields
  //  */
  // sanitizeQueryForAggregate(rawQuery) {
  //   if (!rawQuery) return {};
  //   delete rawQuery.page;
  //   delete rawQuery.limit;
  //   delete rawQuery.sort;
  //   delete rawQuery.searchOptions;
  //   return rawQuery;
  // }

  // /**
  //  * For checking parent reference id in child model when create or update child model
  //  */
  // async checkParentExist<ParentType>(
  //   parentId: TypeObjectId,
  //   parentService: Service<ParentType>,
  //   options?: QueryOptions
  // ): Promise<void> {
  //   if (!parentId) return;
  //   const isExist = await parentService.findOne(
  //     {
  //       _id: parentId,
  //     },
  //     {},
  //     options
  //   );

  //   if (!isExist)
  //     throw new NotFoundException(
  //       `Parent document ${parentService.modelName} _id ${String(
  //         parentId
  //       )} not found`
  //     );
  // }

  // // processSolutionFee(payload: {
  // //   modifier: ProcessSolutionFeeModifierInput | {},
  // //   amount: number
  // // }) {
  // //   const { amount, modifier } = payload;

  // //   if (Object.keys(modifier).length === 0) {
  // //     return { fee: 0, receiver_model: modifier };
  // //   }

  // //   const trueModifier = modifier as ProcessSolutionFeeModifierInput

  // //   const {
  // //     isPromotion,
  // //     fee_type,
  // //     fee_fixed,
  // //     fee_percentage,
  // //     receiver_model,
  // //     //below here deprecated
  // //     min_fee,
  // //     max_fee,
  // //     minApplied,
  // //     maxApplied,
  // //   } = trueModifier;

  // //   /**
  // //    * BASIC CALCULATION
  // //    */
  // //   let calculatedFee = 0;
  // //   if (fee_type === 'fixed') {
  // //     calculatedFee = fee_fixed;
  // //   } else if (fee_type === 'percentage') {
  // //     calculatedFee = Number(((fee_percentage * amount) / 100).toFixed());
  // //   }

  // //   /**
  // //    * MIN MAX CHECK
  // //    */
  // //   if (minApplied && calculatedFee < min_fee) {
  // //     calculatedFee = min_fee;
  // //   } else if (maxApplied && calculatedFee > max_fee) {
  // //     calculatedFee = max_fee;
  // //   }

  // //   /**
  // //    * PROMOTION ALWAYS CUT THE AMOUNT
  // //    */
  // //   if (isPromotion) return { fee: -calculatedFee, receiver_model };
  // //   return { fee: calculatedFee, receiver_model };
  // // };
}
