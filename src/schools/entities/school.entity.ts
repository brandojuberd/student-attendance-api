import { ArgsType, Field, ObjectType, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectIdScalar } from 'src/common/graphql/scalars/object-id.scalars';
import { TypeObjectId } from 'src/common/helpers/mongoose.helper';
@Schema({ timestamps: true })
@ArgsType()
@ObjectType()
export class School {
  @Field(() => ObjectIdScalar)
  _id!: TypeObjectId;

  @Field()
  @Prop({ type: String })
  name!: string;

  @Field()
  @Prop({ type: String })
  logoPhoto!: string;

  @Field()
  @Prop({ type: String })
  address!: string;

  @Field({description: "Area code ex: Jakarta is 21"})
  @Prop({ type: String })
  areaCode!: string;

  @Field({description: "phone without area code"})
  @Prop({ type: String })
  phone!: string;
}

// Schema used to register as collection in Mongo
export const SchoolSchema = SchemaFactory.createForClass(School);
// SchoolSchema.index({ email: 1 });
