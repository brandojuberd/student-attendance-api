import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, QueryOptions } from 'mongoose';
import { Service } from 'src/common/services/base-service.service';
import { CreateStudentAttendanceInput } from './dto/create-student-attendance.input';
import { StudentAttendancesList } from './dto/student-attendance-lists.object';
import { StudentAttendance } from './entities/student-attendance.entity';
import { DateTime } from 'luxon';
import { StudentAttendanceUpdateObject } from './dto/student-attendance-create.object';
import { GetStudentAttendancesArgs } from './dto/get-student-attendances-args';
import { WhatsappsService } from 'src/whatsapps/whatsapps.service';
import { TypeObjectId } from 'src/common/helpers/mongoose.helper';
// ${1 : PascalCase}
// ${2 : camelCase}
@Injectable()
export class StudentAttendancesService extends Service<StudentAttendance> {
  constructor(
    @InjectModel('StudentAttendance')
    private readonly studentAttendanceModel: Model<StudentAttendance>,
    private readonly whatsappsService: WhatsappsService,
  ) {
    super(studentAttendanceModel);
  }

  // --- FIND
  async getStudentAttendancesList(
    query: GetStudentAttendancesArgs,
    // userContext: UserContext,
    projection?: any,
    options?: QueryOptions,
  ): Promise<StudentAttendancesList> {
    const finalQuery = this.transformQuery(query);
    const studentAttendances = await this.find(finalQuery, projection, options);
    const count = await this.count(finalQuery);
    return {
      studentAttendances,
      count,
    };
  }

  // --- CREATE
  async createStudentAttendance(
    data: CreateStudentAttendanceInput,
  ): Promise<StudentAttendanceUpdateObject> {
    let timeJakarta = DateTime.now().setZone('Asia/Jakarta');
    const lateTime = timeJakarta.set({ hour: 6, minute: 30 });
    const checkIn = DateTime.fromJSDate(data.checkIn).setZone('Asia/Jakarta');
    // if (checkIn)
    // const currentStudentAttendance = await this.findOneV2({
    //   student: data.student,
    //   checkIn: {
    //     $gte: new Date(data.checkIn).setHours(0),
    //     $lte: new Date(data.checkIn).setHours(23, 59),
    //   },
    // });
    // if (currentStudentAttendance) {
    //   throw new BadRequestException('Siswa/i telah melakukan check in');
    // }
    const studentAttendance = await this.create(data);
    // if (checkIn > lateTime) {
    //   return {
    //     studentAttendance,
    //     message: 'Siswa/i terlambat',
    //   };
    // }
    await this.whatsappsService.sendAnyMessage();
    return {
      studentAttendance,
      message: 'Berhasil melakukan check in',
    };
  }

  // --- UPDATE
  async checkoutStudent(
    studentId: TypeObjectId,
  ): Promise<StudentAttendanceUpdateObject> {
    let timeJakarta = DateTime.now().setZone('Asia/Jakarta');
    const currentStudentAttendance = await this.findOneV2({
      student: studentId,
      checkIn: {
        $gte: timeJakarta.set({ hour: 0, minute: 0 }),
        $lte: timeJakarta.set({ hour: 23, minute: 59 }),
      },
    });
    if (!currentStudentAttendance) {
      throw new BadRequestException('Siswa/i belum melakukan check in');
    }
    currentStudentAttendance.checkOut = timeJakarta.toJSDate();
    currentStudentAttendance.save();
    return {
      studentAttendance: currentStudentAttendance,
      message: 'Berhasil melakukan check out.',
    };
  }

  // --- HELPER
  transformQuery(query: GetStudentAttendancesArgs) {
    let { dateRange, ...omittedQuery } = query;

    let dateRangeQuery: {
      checkIn?: {
        $gte?: Date;
        $lte?: Date;
      };
    } = {};
    if (dateRange) {
      let { start, end } = dateRange;
      if (start && end) {
        dateRangeQuery = {
          checkIn: {
            $gte: start,
            $lte: end,
          },
        };
      } else if (start) {
        dateRangeQuery = {
          checkIn: {
            $gte: start,
          },
        };
      } else if (end) {
        dateRangeQuery = {
          checkIn: {
            $lte: end,
          },
        };
      }
    }

    return {
      ...omittedQuery,
      ...dateRangeQuery,
    };
  }
}
