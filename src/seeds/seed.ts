import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Teacher } from '../school/entities/teacher.entity';
import { Student } from '../school/entities/student.entity';
import { Class } from '../school/entities/class.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Teacher.name) private teacherModel: Model<Teacher>,
    @InjectModel(Student.name) private studentModel: Model<Student>,
    @InjectModel(Class.name) private classModel: Model<Class>,
  ) {}

  async run() {
    const teacher = await this.teacherModel.create({
      teacherName: 'John Doe',
      email: 'john@example.com',
      address: '123 Main St',
    });

    const students = await this.studentModel.create([
      { name: 'Alice', roll: 'A1', age: 16, class: 'Class A' },
      { name: 'Bob', roll: 'B1', age: 17, class: 'Class A' },
    ]);

    await this.classModel.create({
      className: 'Class A',
      classStd: '10th',
      teacher: teacher._id,
      students: students.map((s) => s._id),
    });
  }
}
