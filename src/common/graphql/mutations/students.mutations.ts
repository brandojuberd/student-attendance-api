export const STUDENT_CREATE = `
mutation StudentCreate($data: CreateStudentInput!){
  studentCreate(data: $data) {
    _id
    nik
    fullName
    profilePhoto
    school
    class
    birthDate
    countryCode
    phone
  }
}
`


