import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Class } from './class.entity';
import { Types } from 'mongoose';

@Schema()
export class Student extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  roll: string;

  @Prop({ required: true })
  age: number;

  @Prop({ type: Types.ObjectId, ref: 'Class' })
  class: Class;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
