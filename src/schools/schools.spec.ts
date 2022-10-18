import { INestApplication } from '@nestjs/common';
import { GraphQLSchemaHost } from '@nestjs/graphql';
import { TestingModule, Test } from '@nestjs/testing';
import { LeanDocument } from 'mongoose';
import { AppModule } from 'src/app.module';
import { STUDENT_CREATE } from 'src/common/graphql/mutations/students.mutations';
import { checkEnvVariable } from 'src/common/helpers/check-env-variable.helper';
import { TypeObjectId } from 'src/common/helpers/mongoose.helper';
import { DatabaseTest } from 'src/common/testing/database-test';
import { UsersService } from 'src/users/users.service';
import supertest from 'supertest';
import { faker } from '@faker-js/faker/locale/id_ID';
import { SchoolsService } from './schools.service';
import {
  STUDENT_ATTENDANCE_CREATE,
  STUDENT_ATTENDANCE_CHECKOUT,
} from 'src/common/graphql/mutations/student-attendances.mutations';
import { STUDENTS_LIST } from 'src/common/graphql/queries/students.queries';
import { Student } from 'src/students/entities/student.entity';
import { StudentAttendance } from 'src/students/student-attendances/entities/student-attendance.entity';
import { StudentAttendancesService } from 'src/students/student-attendances/student-attendances.service';
import { StudentsService } from 'src/students/students.service';
import { SCHOOL_CREATE } from 'src/common/graphql/mutations/schools.mutations';
import { School } from './entities/school.entity';

describe('School', () => {
  let dbSetup: DatabaseTest;
  let testModule: TestingModule;
  let app: INestApplication;

  let studentsService: StudentsService;
  let studentAttendanceService: StudentAttendancesService;
  let schoolsService: SchoolsService;
  /**
   * Base transport fee for 122 km and price 3500 rp/km
   */
  const baseTransportFee = 122 * 3500;

  beforeAll(async () => {
    try {
      dbSetup = new DatabaseTest();
      await dbSetup.setupDatabaseTest();
      testModule = await Test.createTestingModule({
        imports: [
          AppModule,
          // MongooseModule.forRoot(dbSetup.getUri())
        ],
      })
        .overrideProvider('DatabaseConnection')
        .useFactory({
          factory: async () => {
            return await dbSetup.getConnection();
          },
        })
        .compile();
      schoolsService = testModule.get<SchoolsService>(SchoolsService);
      studentsService = testModule.get<StudentsService>(StudentsService);
      studentAttendanceService = testModule.get<StudentAttendancesService>(
        StudentAttendancesService,
      );
      app = testModule.createNestApplication();
      await app.init();
      return;
    } catch (error) {
      console.error(error);
    }
  });

  // This should test all layer (GraphQL) or e2e
  it('should create, read, update, and delete solutions e2e', async () => {
    let data = {
      name: 'SMP Negeri 1 Jambi',
      areaCode: '88',
      logoPhoto:
        'https://i0.wp.com/spensajambi.sch.id/wp-content/uploads/2022/09/WhatsApp-Image-2022-09-21-at-09.09.03.jpeg',
      address:
        'Jl. Raden Mattaher, Ps. Jambi, Kec. Ps. Jambi, Kota Jambi, Jambi 36361',
      phone: '123456789',
    };

    // CREATE
    let res = await supertest(app.getHttpServer())
      .post('/graphql')
      // .set('Authorization', `Bearer ${adminProfile.accessToken}`)
      .send({
        operationName: null,
        variables: {
          data,
        },
        query: SCHOOL_CREATE,
      });
    expect(res.body.errors).toBeUndefined();
    let school: School = res.body.data.schoolCreate;
    expect(new TypeObjectId(school._id)).toBeInstanceOf(TypeObjectId);
  });

  afterAll(async () => {
    try {
      await testModule.close();
      await dbSetup.close();
    } catch (e) {
      console.warn('error', e);
    } finally {
      return;
    }
  });
});
