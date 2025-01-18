import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Teacher } from './teacher.entity';
import { Student } from './student.entity';
import { Types } from 'mongoose';

@Schema()
export class Class extends Document {
  @Prop({ required: true })
  className: string;

  @Prop({ required: true })
  classStd: string;

  @Prop({ type: Types.ObjectId, ref: 'Teacher' })
  teacher: Teacher;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Student' }] })
  students: Student[];
}

export const ClassSchema = SchemaFactory.createForClass(Class);
