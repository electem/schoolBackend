import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Class } from '../entities/class.entity';
import { Teacher } from '../entities/teacher.entity';
import { Student } from '../entities/student.entity';

@Injectable()
export class ClassService {
  constructor(
    @InjectModel(Class.name) private classModel: Model<Class>,
    @InjectModel(Teacher.name) private readonly teacherModel: Model<Teacher>,
    @InjectModel(Student.name) private readonly studentModel: Model<Student>,
  ) {}

  async create(createClassDto: any): Promise<Class> {
    // Step 1: Create the class
    const createdClass = new this.classModel(createClassDto);
    const savedClass = await createdClass.save();

    // Step 2: Update the student entities with the new class ID
    if (createClassDto.students && createClassDto.students.length > 0) {
      await this.studentModel.updateMany(
        { _id: { $in: createClassDto.students } }, // Match students by their IDs
        { $set: { class: savedClass._id.toString() } }, // Set the `class` field to the new class ID
      );
    }
    // Step 3: Update the teacher entity with the new class ID
    if (createClassDto.teacher) {
      // Ensure that teacher is not an array (single teacher assignment)
      await this.teacherModel.updateOne(
        { _id: createClassDto.teacher }, // Match the teacher by their ID
        { $set: { class: savedClass._id.toString() } }, // Set the `class` field in teacher to the new class ID
      );
    }

    return savedClass;
  }

  findAll(): Promise<Class[]> {
    return this.classModel
      .find()
      .populate('teacher')
      .populate('students')
      .exec()
      .then((classes) => {
        return classes;
      });
  }

  async findOne(id: string): Promise<Class> {
    return this.classModel
      .findById(id)
      .populate('teacher')
      .populate('students')
      .exec();
  }

  async update(id: string, updateClassDto: any): Promise<Class> {
    return this.classModel.findByIdAndUpdate(id, updateClassDto, { new: true });
  }

  async remove(id: string): Promise<any> {
    return this.classModel.findByIdAndDelete(id);
  }

  async findAllTeacher(): Promise<Teacher[]> {
    return this.teacherModel.find().exec();
  }

  async findStudentsByClassId(classId: string): Promise<Student[]> {
    return this.studentModel
      .find({ class: classId }) // Match students where class matches the classId
      .exec();
  }

  async findAllTeachers(): Promise<Teacher[]> {
    return this.teacherModel.find().exec();
  }

  async findAllStudents(): Promise<Student[]> {
    return this.studentModel.find().exec();
  }
}
