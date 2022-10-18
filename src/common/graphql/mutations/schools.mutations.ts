export const SCHOOL_CREATE = `
mutation SchoolCreate($data: CreateSchoolInput!) {
  schoolCreate(data: $data) {
    _id
    address
    areaCode
    logoPhoto
    name
    phone
  }
}

`;
