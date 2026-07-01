import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { v2 as cloudinary } from 'cloudinary';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Upload } from './upload.entity';
import * as multer from 'multer';

@Module({
  imports: [
    TypeOrmModule.forFeature([Upload]),
    MulterModule.register({
      storage: multer.memoryStorage(),
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (req, file, callback) => {
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
        const isAllowed = allowedMimeTypes.includes(file.mimetype);
        callback(isAllowed ? null : new Error('Invalid file type'), isAllowed);
      },
    }),
  ],
  providers: [
    {
      provide: 'CLOUDINARY_CONFIG',
      useFactory: () => {
        cloudinary.config({
          cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dexnv9lbp',
          api_key: process.env.CLOUDINARY_API_KEY || '175919299779187',
          api_secret:
            process.env.CLOUDINARY_API_SECRET || 'YHzhWGEWofhGcXgHMlw-J8FYFMY',
        });
      },
    },
    UploadService,
  ],
  controllers: [UploadController],
  exports: [TypeOrmModule],
})
export class UploadModule {}
