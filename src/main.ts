import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable CORS for all origins
  app.enableCors({
    origin: '*', // Allows requests from all origins (adjust as needed for production)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
    allowedHeaders: 'Content-Type, Accept', // Allowed headers
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
