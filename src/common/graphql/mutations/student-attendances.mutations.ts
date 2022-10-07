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

export const STUDENT_ATTENDANCE_CHECKOUT = `
mutation StudentAttendanceCheckout($studentId: ObjectId!){
  studentAttendanceCheckout(studentId: $studentId) {
    studentAttendance {
      checkIn
      checkOut
      student {
        _id
      }
    }
    message
  }

}
`;
