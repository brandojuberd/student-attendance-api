export const CLASSROOM_CREATE = `
mutation ClassroomCreate($data: CreateClassroomInput!){
  classroomCreate(data: $data) {
    _id
    grade
    name
    school {
      _id
    }
  }
}
`;
