export const STUDENT_ATTENDANCE_CREATE = `
mutation StudentAttendanceCreate($data: CreateStudentAttendanceInput!){
  studentAttendanceCreate(data: $data) {
    studentAttendance {
      checkIn
      checkOut
      student {
        _id
      }
    }
    message
  }
}`;
