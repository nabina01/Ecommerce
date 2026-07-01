import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileInterceptor,
  FileFieldsInterceptor,
} from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { UploadService } from './upload.service';
import type { DeleteUploadsDto } from './dto/delete-uploads.dto';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('single')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    }),
  )
  async uploadSingle(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      // Multer will often return this when the client didn't send form-data correctly
      throw new BadRequestException('Missing required parameter - file');
    }
    return this.uploadService.uploadImage(file);
  }

  @Post('multiple')
  // accept either 'files' (array) or repeated 'file' fields
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'files', maxCount: 10 },
        { name: 'file', maxCount: 10 },
      ],
      { storage: memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } },
    ),
  )
  async uploadMultiple(
    @UploadedFiles()
    filesObj: { files?: Express.Multer.File[]; file?: Express.Multer.File[] },
  ) {
    const files = [...(filesObj.files ?? []), ...(filesObj.file ?? [])];
    if (!files || files.length === 0) {
      throw new BadRequestException('No files provided for upload');
    }
    if (files.length > 10) {
      throw new BadRequestException('Maximum 10 files allowed per upload');
    }
    return this.uploadService.uploadMultipleImages(files);
  }
  @Delete('delete')
  delete(@Body('publicId') publicId: string) {
    return this.uploadService.deleteImage(publicId);
  }

  @Delete('multiple')
  async deleteMultipleUploads(@Body() body: DeleteUploadsDto) {
    const { uploadIds } = body;
    if (!Array.isArray(uploadIds) || uploadIds.length === 0) {
      throw new BadRequestException(
        'uploadIds must be a non-empty array of UUIDs',
      );
    }

    const report = await this.uploadService.deleteMultipleUploads(uploadIds);

    return {
      message: 'Delete multiple completed',
      successCount: report.successCount,
      failed: report.failed,
    };
  }
}
