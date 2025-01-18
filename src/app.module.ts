// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SchoolModule } from './school/school.module';
import { mongooseConfig } from './config/database.config';

@Module({
  imports: [MongooseModule.forRoot(mongooseConfig.uri), SchoolModule], // No need to pass additional options
})
export class AppModule {}
