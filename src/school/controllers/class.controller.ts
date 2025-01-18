import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ClassService } from '../services/class.service';
import { Class } from '../entities/class.entity';
import { Teacher } from '../entities/teacher.entity';
import { Student } from '../entities/student.entity';

@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Get('/getallteachers')
  async getAllTeachers(): Promise<Teacher[]> {
    return this.classService.findAllTeachers();
  }

  @Get('/getallStudents')
  async getallStudents(): Promise<Student[]> {
    return this.classService.findAllStudents();
  }

  @Post('/createClass')
  create(@Body() createClassDto: any): Promise<Class> {
    return this.classService.create(createClassDto);
  }

  @Get()
  findAll(): Promise<Class[]> {
    return this.classService.findAll();
  }

  @Get('/getClassById/:id')
  findOne(@Param('id') id: string): Promise<Class> {
    return this.classService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateClassDto: any): Promise<Class> {
    return this.classService.update(id, updateClassDto);
  }

  @Delete('/deleteClass/:id')
  remove(@Param('id') id: string): Promise<any> {
    return this.classService.remove(id);
  }

  @Get('geStudentbyClassId/:classId')
  async getStudentsByClassId(@Param('classId') classId: string) {
    return this.classService.findStudentsByClassId(classId);
  }
}
