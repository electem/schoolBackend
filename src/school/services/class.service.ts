import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Class } from '../entities/class.entity';
import { Teacher } from '../entities/teacher.entity';

@Injectable()
export class ClassService {
  constructor(
    @InjectModel(Class.name) private classModel: Model<Class>,
    @InjectModel('Teacher') private readonly teacherModel: Model<Teacher>,
  ) {}

  async create(createClassDto: any): Promise<Class> {
    const createdClass = new this.classModel(createClassDto);
    return createdClass.save();
  }

  async findAll(): Promise<Class[]> {
    return this.classModel
      .find()
      .populate('teacher')
      .populate('students')
      .exec();
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
}
