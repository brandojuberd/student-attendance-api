import { TypeObjectId } from 'src/common/helpers/mongoose.helper';

export interface UserContext {
  _id: TypeObjectId;
  username: string;
  email: string;
  role: string;
}
