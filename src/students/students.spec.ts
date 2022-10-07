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
import { Student, StudentSchema } from './entities/student.entity';
// import { faker } from '@faker-js/faker';
import { faker } from '@faker-js/faker/locale/id_ID';
import { StudentsService } from './students.service';
import { STUDENTS_LIST } from 'src/common/graphql/queries/students.queries';
import { StudentAttendancesService } from './student-attendances/student-attendances.service';
import { STUDENT_ATTENDANCE_CREATE } from 'src/common/graphql/mutations/student-attendances.mutations';
import { StudentAttendance } from './student-attendances/entities/student-attendance.entity';

function generateRandomStudent() {
  return {
    nik: String(faker.datatype.number({ min: 3234567890123456 })),
    fullName: faker.name.fullName(),
    profilePhoto:
      'https://img.myloview.com/stickers/person-gray-photo-placeholder-little-boy-400-149274768.jpg',
    birthDate: faker.date.birthdate({ min: 2007, max: 2010, mode: 'year' }),
    school: 'SMAN 1',
    class: '12-A',
    countryCode: '62',
    phone: faker.phone.number('81########'),
  };
}

describe('Solutions', () => {
  let dbSetup: DatabaseTest;
  let testModule: TestingModule;
  let app: INestApplication;

  let studentsService: StudentsService;
  let studentAttendanceService: StudentAttendancesService;
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
      nik: '1234567890123456',
      fullName: 'John Doe',
      profilePhoto:
        'https://img.myloview.com/stickers/person-gray-photo-placeholder-little-boy-400-149274768.jpg',
      birthDate: '2006-08-20',
      school: 'SMAN 1',
      class: '12-A',
      countryCode: '62',
      phone: '8182309291',
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
        query: STUDENT_CREATE,
      });
    expect(res.body.errors).toBeUndefined();
    let student: Student = res.body.data.studentCreate;
    expect(new TypeObjectId(student._id)).toBeInstanceOf(TypeObjectId);

    // CREATE 9 STUDENTS
    for (let i = 0; i < 9; i++) {
      res = await supertest(app.getHttpServer())
        .post('/graphql')
        // .set('Authorization', `Bearer ${adminProfile.accessToken}`)
        .send({
          operationName: null,
          variables: {
            data: generateRandomStudent(),
          },
          query: STUDENT_CREATE,
        });
      expect(res.body.errors).toBeUndefined();
    }

    // FIND
    res = await supertest(app.getHttpServer())
      .post('/graphql')
      // .set('Authorization', `Bearer ${adminProfile.accessToken}`)
      .send({
        operationName: null,
        variables: {
          query: {},
        },
        query: STUDENTS_LIST,
      });
    expect(res.body.errors).toBeUndefined();
    let students: Student[] = res.body.data.studentsList.students;
    expect(students.length).toEqual(10);

    // CREATE student attendance on-time
    let firstStudent = students[0];
    res = await supertest(app.getHttpServer())
      .post('/graphql')
      // .set('Authorization', `Bearer ${adminProfile.accessToken}`)
      .send({
        operationName: null,
        variables: {
          data: {
            checkIn: new Date().setHours(8),
            student: firstStudent._id,
          },
        },
        query: STUDENT_ATTENDANCE_CREATE,
      });
    expect(res.body.errors).toBeUndefined();
    let studentAttendance: StudentAttendance =
      res.body.data.studentAttendanceCreate.studentAttendance;
    expect(studentAttendance.student._id).toEqual(firstStudent._id);

    // // ERROR CREATE student attendance second time
    // res = await supertest(app.getHttpServer())
    //   .post('/graphql')
    //   // .set('Authorization', `Bearer ${adminProfile.accessToken}`)
    //   .send({
    //     operationName: null,
    //     variables: {
    //       data: {
    //         checkIn: new Date().setHours(8),
    //         student: firstStudent._id,
    //       },
    //     },
    //     query: STUDENT_ATTENDANCE_CREATE,
    //   });
    // expect(res.body.errors[0].message).toMatch(
    //   /Siswa\/i telah melakukan check in/,
    // );

    // CREATE student attendance late time
    // res = await supertest(app.getHttpServer())
    //   .post('/graphql')
    //   // .set('Authorization', `Bearer ${adminProfile.accessToken}`)
    //   .send({
    //     operationName: null,
    //     variables: {
    //       data: {
    //         checkIn: new Date().setHours(8),
    //         student: students[0],
    //       },
    //     },
    //     query: STUDENT_ATTENDANCE_CREATE,
    //   });
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
