import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Class } from './class.entity';
import { Types } from 'mongoose';

@Schema()
export class Teacher extends Document {
  @Prop({ required: true })
  teacherName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  address: string;

  @Prop({ type: Types.ObjectId, ref: 'Class' })
  class: Class; // One-to-One relationship with Class
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
