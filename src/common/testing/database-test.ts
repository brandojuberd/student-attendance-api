import { User } from 'src/users/entities/users.entity';
import mongoose from 'mongoose';
import {
  createReadStream,
  createWriteStream,
  promises as fs,
  WriteStream,
} from 'fs';
import { UsersService } from 'src/users/users.service';
import { MongoMemoryReplSet, MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient } from 'mongodb';
import { checkEnvVariable } from 'src/common/helpers/check-env-variable.helper';
import { Service } from '../services/base-service.service';

// export const getUserContext = (user: User): UserContext => {
//   return {
//     userId: user._id, //_id is returned as string
//     email: user.email,
//     username: user.username,
//     employeeId: user.employee,
//     companyId: user.company,
//     access: user.access,
//     role: user.role,
//   };
// };

export interface DatabaseTestOptions {
  /**
   * Start MongoMemoryReplSet to start multiple mongo server
   */
  replica: boolean;
}

declare var global: {
  __MONGO_URI__: string;
};

export class DatabaseTest {
  private mongoServer!: MongoMemoryServer | MongoMemoryReplSet;
  private dbTestConnection!: mongoose.Connection;
  // constructor() {}
  private connection!: MongoClient;
  // getUri() {
  //   return this.mongoServer.getUri();
  // }

  getConnection() {
    return this.dbTestConnection;
  }

  /**
   * Creating Mongo Instance on localhost and create connection to it.
   */
  async setupDatabaseTest(options?: DatabaseTestOptions) {
    const replOpts: Record<string, any> = {};
    // const replOpts: Partial<MongoMemoryReplSetOpts> = {}; // commented for now
    try {
      this.connection = await MongoClient.connect(global.__MONGO_URI__, {});
      // const { replica, ...finalOption } = options || {};
      // if (replica) {
      //   replOpts.replSet = { count: 2 };
      //   if (process.platform !== 'darwin') {
      //     //? specificying storageEngine on darwin (macOS) will result in error
      //     //? code in this if block only provide instanceOpts option when platform is not darwin.
      //     replOpts.instanceOpts = [];
      //     for (let i = 0; i < replOpts.replSet.count; i++) {
      //       replOpts.instanceOpts.push({
      //         storageEngine: 'wiredTiger',
      //       });
      //     }
      //   }
      // }
      // this.mongoServer = await MongoMemoryReplSet.create({
      //   ...(finalOption || {}),
      //   ...replOpts,
      // });

      this.dbTestConnection = mongoose.createConnection(
        global['__MONGO_URI__'],
      );
      // this.dbTestConnection = await this.connection.();
      await this.dropDatabase();
    } catch (error: any) {
      throw new Error(error);
    } finally {
    }
  }

  private async dropDatabase() {
    // if (
    //   process.env.NODE_ENV === 'test' &&
    //   process.env.MONGO_URI_TEST !== process.env.MONGO_URI
    // ) {
    await this.dbTestConnection.dropDatabase();
    // } else {
    //   console.warn('Database not dropped please check env variable');
    // }
  }

  /**
   * Seed Database
   *
   * @params collectionNames  - array of collection names if not defined it will seed all collections.
   */
  async seedDatabase(services: Service<any>[]) {
    const result = [];
    try {
      for (let i = 0; i < services.length; i++) {
        const service = services[i];
        if (!service) {
          throw new Error(`Error on seed data: services[${i}] is undefined`);
        }
        let data = [];
        const { files, directoryPath } = await this.searchFileDirectory(
          checkEnvVariable('TESTING_SEED_PATH'),
        );

        if (files.includes(`${service.modelName.toLowerCase()}.seed.json`)) {
          data = JSON.parse(
            (
              await fs.readFile(
                `${directoryPath}/${service.modelName.toLowerCase()}.seed.json`,
              )
            ).toString(),
          );
        } else if (
          files.includes(`${service.modelName.toLowerCase()}.seed.ts`)
        ) {
          data = require(`./data/${service.modelName.toLowerCase()}.seed`);
        }
        result.push(service.insertMany(data));
      }
      return await Promise.all(result);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      throw new Error(err);
    } finally {
      // console.warn("Seeding Database Success")
    }
  }

  private async searchFileDirectory(directoryPath: string): Promise<{
    files: string[];
    directoryPath: string;
  }> {
    try {
      const files = await fs.readdir(
        `${directoryPath || './src/helpers/testing/data'}`,
      );
      return {
        files,
        directoryPath: directoryPath,
      };
    } catch (err: any) {
      if (err.errno === -2) {
        return this.searchFileDirectory('./src/helpers/testing/data');
      }
      console.error(JSON.stringify(err, null, 2));
      throw new Error(err);
    }
  }

  // async getUsersContext(usersService: UsersService): Promise<{
  //   superAdminContext: UserContext;
  //   /**
  //    * Associated with Lovecare
  //    */
  //   adminContext: UserContext;
  //   adminHrContext: UserContext;
  //   /**
  //    * Associated with Company SSF
  //    */
  //   partnerManagerContext: UserContext;
  //   /**
  //    * Associated with Company SSF
  //    */
  //   partnerAdminContext: UserContext;
  //   /**
  //    * Associated with Company Sukses Maju
  //    */
  //   partnerManagerSuksesMajuContext: UserContext;
  //   partnerAdminSuksesMajuContext: UserContext;
  //   /**
  //    * Customer
  //    */
  //   firstCustomerContext: UserContext;
  //   secondCustomerContext: UserContext;
  //   thirdCustomerContext: UserContext;
  //   /**
  //    * UserEmployee associated with Employee John Doe and Company SSF
  //    */
  //   userEmployeeContext: UserContext;
  //   /**
  //    * UserEmployee associated with Employee Agus Heri and Company SSF
  //    */
  //   userEmployee2Context: UserContext;
  //   userEmployee3Context: UserContext;
  // }> {
  //   const superAdminContext = getUserContext(
  //     await usersService.findOne({ email: 'superadmin@example.com' })
  //   );
  //   const adminContext = getUserContext(
  //     await usersService.findOne({ email: 'admin@example.com' })
  //   );
  //   const adminHrContext = getUserContext(
  //     await usersService.findOne({ email: 'adminhr@example.com' })
  //   );
  //   const partnerManagerContext = getUserContext(
  //     await usersService.findOne({ email: 'partnermanager@example.com' })
  //   );
  //   const partnerAdminContext = getUserContext(
  //     await usersService.findOne({ email: 'partneradmin@example.com' })
  //   );
  //   const partnerManagerSuksesMajuContext = getUserContext(
  //     await usersService.findOne({
  //       email: 'partnermanagersuksesmaju@example.com',
  //     })
  //   );
  //   const partnerAdminSuksesMajuContext = getUserContext(
  //     await usersService.findOne({
  //       email: 'partneradminsuksesmaju@example.com',
  //     })
  //   );
  //   const firstCustomerContext = getUserContext(
  //     await usersService.findOne({ email: 'firstcustomer@example.com' })
  //   );
  //   const secondCustomerContext = getUserContext(
  //     await usersService.findOne({ email: 'secondcustomer@example.com' })
  //   );
  //   const thirdCustomerContext = getUserContext(
  //     await usersService.findOne({ email: 'thirdcustomer@example.com' })
  //   );
  //   const userEmployeeContext = getUserContext(
  //     await usersService.findOne({ email: 'johndoe@example.com' })
  //   );
  //   const userEmployee2Context = getUserContext(
  //     await usersService.findOne({ email: 'agusheri@example.com' })
  //   );
  //   const userEmployee3Context = getUserContext(
  //     await usersService.findOne({ email: 'shintasuksesmaju@example.com' })
  //   );
  //   return {
  //     superAdminContext,
  //     adminContext,
  //     adminHrContext,
  //     partnerManagerContext,
  //     partnerAdminContext,
  //     partnerManagerSuksesMajuContext,
  //     partnerAdminSuksesMajuContext,
  //     firstCustomerContext,
  //     secondCustomerContext,
  //     thirdCustomerContext,
  //     userEmployeeContext,
  //     userEmployee2Context,
  //     userEmployee3Context,
  //   };
  // }

  // async testFileUpload() {
  //   return {
  //     filename: 'lc-supergraphic',
  //     mimetype: 'image',
  //     encoding: 'utf8',
  //     // @ts-ignore // ReadStream type not updated ?
  //     createReadStream() {
  //       return createReadStream(process.env.TESTING_IMAGE_PATH, {
  //         encoding: 'utf8',
  //       });
  //     },
  //   };
  // }

  // getFileUpload() {
  //   return new Promise((resolve) =>
  //     resolve({
  //       createReadStream: () =>
  //         createReadStream(process.env.TESTING_IMAGE_PATH, {
  //           encoding: 'utf8',
  //         }),
  //       filename: 'some_file.txt',
  //       mimetype: 'text/plain',
  //       encoding: 'utf8',
  //     })
  //   );
  // }

  /**
   * RUN THIS METHOD LAST.
   * @description Close connection with Mongo Instance and stop Mongo Instance. Please beware if this function run first, and there are still method to execute with reference to MongoDB it will throw error or not exiting cleanly
   */
  async close() {
    try {
      await this.dbTestConnection.close(true);
      if (this.connection) {
        await this.connection.close();
      }
      if (this.mongoServer) {
        await this.mongoServer.stop({ doCleanup: true });
      }
    } catch (err) {
      console.error(err);
    } finally {
    }
  }
}
