// src/config/database.config.ts
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const mongooseConfig: MongooseModuleOptions = {
  uri: 'mongodb://localhost/school-management', // Keep your connection URI as is
};
