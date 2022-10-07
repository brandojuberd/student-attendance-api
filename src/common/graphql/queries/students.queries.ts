export const STUDENTS_LIST = `
query($query: GetStudentsArgs!) {
  studentsList(query: $query) {
    count
    students {
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
}
`;
