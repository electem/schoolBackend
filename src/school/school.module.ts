import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Teacher, TeacherSchema } from './entities/teacher.entity';
import { Student, StudentSchema } from './entities/student.entity';
import { Class, ClassSchema } from './entities/class.entity';
import { ClassService } from './services/class.service';
import { ClassController } from './controllers/class.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Teacher.name, schema: TeacherSchema },
      { name: Student.name, schema: StudentSchema },
      { name: Class.name, schema: ClassSchema },
    ]),
  ],
  controllers: [ClassController],
  providers: [ClassService],
})
export class SchoolModule {}
