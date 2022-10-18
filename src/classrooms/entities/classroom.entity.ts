import { ArgsType, Field, ObjectType, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectIdScalar } from 'src/common/graphql/scalars/object-id.scalars';
import { ObjectId, TypeObjectId } from 'src/common/helpers/mongoose.helper';
import { School } from 'src/schools/entities/school.entity';
import { ClassroomGradeEnum } from './classroom-grade.enum';
@Schema({ timestamps: true })
@ArgsType()
@ObjectType()
export class Classroom {
  @Field(() => ObjectIdScalar)
  _id!: TypeObjectId;

  @Field(() => School)
  @Prop({ type: ObjectId, ref: School.name })
  school!: TypeObjectId;

  @Field(() => ClassroomGradeEnum)
  @Prop({ type: String })
  grade!: ClassroomGradeEnum;

  @Field(() => String)
  @Prop({ type: String })
  name!: string;
}

// Schema used to register as collection in Mongo
export const ClassroomSchema = SchemaFactory.createForClass(Classroom);
// ClassroomSchema.index({ email: 1 });
