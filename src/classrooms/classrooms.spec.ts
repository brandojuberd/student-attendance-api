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
import {
  STUDENT_ATTENDANCE_CREATE,
  STUDENT_ATTENDANCE_CHECKOUT,
} from 'src/common/graphql/mutations/student-attendances.mutations';
import { STUDENTS_LIST } from 'src/common/graphql/queries/students.queries';
import { Student } from 'src/students/entities/student.entity';
import { StudentAttendance } from 'src/students/student-attendances/entities/student-attendance.entity';
import { StudentAttendancesService } from 'src/students/student-attendances/student-attendances.service';
import { StudentsService } from 'src/students/students.service';
import { CLASSROOM_CREATE } from 'src/common/graphql/mutations/classrooms.mutations';
import { Classroom } from './entities/classroom.entity';
import { SchoolsService } from 'src/schools/schools.service';

describe('Classrooms', () => {
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
      grade: 'Nine',
      name: 'A',
      school: '634ee1ebd765d04e87770fed',
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
        query: CLASSROOM_CREATE,
      });
    expect(res.body.errors).toBeUndefined();
    let classroom: Classroom = res.body.data.classroomCreate;
    expect(new TypeObjectId(classroom._id)).toBeInstanceOf(TypeObjectId);
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
