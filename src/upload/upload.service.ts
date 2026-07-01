import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { Upload } from './upload.entity';

export interface CloudinaryResponse {
  public_id: string;
  secure_url: string;
  original_filename: string;
  bytes: number;
  format: string;
  width?: number;
  height?: number;
}

@Injectable()
export class UploadService {
  private readonly logger = new Logger(UploadService.name);

  constructor(
    @InjectRepository(Upload)
    private readonly uploadRepo: Repository<Upload>,
  ) {}

  /** Upload single image to Cloudinary */
  async uploadImage(file: Express.Multer.File): Promise<CloudinaryResponse> {
    try {
      return await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'uploads/images', resource_type: 'auto' },
          (error, result) => {
            if (error) {
              reject(new Error(error.message || 'Upload failed'));
            } else {
              resolve(result as CloudinaryResponse);
            }
          },
        );
        stream.end(file.buffer);
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Upload failed';
      throw new InternalServerErrorException(`upload failed: ${message}`);
    }
  }

  /** Upload multiple images */
  async uploadMultipleImages(
    files: Express.Multer.File[],
  ): Promise<CloudinaryResponse[]> {
    try {
      const uploadPromises = files.map((file) => this.uploadImage(file));
      return await Promise.all(uploadPromises);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Upload failed';
      throw new InternalServerErrorException(`upload failed: ${message}`);
    }
  }

  /** Delete a file directly from Cloudinary using public_id */
  async deleteImage(publicId: string): Promise<{ result: string }> {
    try {
      return (await cloudinary.uploader.destroy(publicId)) as {
        result: string;
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Deletion failed';
      throw new InternalServerErrorException(`deletion failed: ${message}`);
    }
  }

  /** Save Cloudinary response to database */
  async saveToDatabase(cloudinaryResult: CloudinaryResponse): Promise<Upload> {
    if (!cloudinaryResult || !cloudinaryResult.public_id) {
      throw new BadRequestException('Invalid Cloudinary response');
    }

    const uploadData: DeepPartial<Upload> = {
      publicId: cloudinaryResult.public_id,
      secureUrl: cloudinaryResult.secure_url,
      originalFilename: cloudinaryResult.original_filename,
      bytes: cloudinaryResult.bytes,
      format: cloudinaryResult.format,
      width: cloudinaryResult.width,
      height: cloudinaryResult.height,
    };

    const upload = this.uploadRepo.create(uploadData);
    return await this.uploadRepo.save(upload);
  }

  /** Find upload by ID */
  async findUploadById(uploadId: string): Promise<Upload> {
    const upload = await this.uploadRepo.findOne({ where: { id: uploadId } });
    if (!upload) {
      throw new NotFoundException(`Upload with id ${uploadId} not found`);
    }
    return upload;
  }

  /** Delete a single upload (Cloudinary + database) */
  async deleteUpload(uploadId: string): Promise<void> {
    const upload = await this.uploadRepo.findOne({ where: { id: uploadId } });
    if (!upload) {
      throw new NotFoundException(`Upload ${uploadId} not found`);
    }

    try {
      await cloudinary.uploader.destroy(upload.publicId);
      await this.uploadRepo.delete(uploadId);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(
        `Failed to delete upload ${uploadId}: ${errorMessage}`,
      );
      throw new InternalServerErrorException(
        `Failed to delete upload ${uploadId}`,
      );
    }
  }

  /** Delete multiple uploads (Cloudinary + database) */
  async deleteMultipleUploads(uploadIds: string[]): Promise<{
    successCount: number;
    failed: { id: string; reason: string }[];
  }> {
    if (!Array.isArray(uploadIds) || uploadIds.length === 0) {
      throw new BadRequestException('uploadIds must be a non-empty array');
    }

    const failed: { id: string; reason: string }[] = [];
    let successCount = 0;

    // Fetch uploads from DB
    const uploads = await this.uploadRepo.findByIds(uploadIds);
    const foundIds = uploads.map((u) => u.id);
    const notFoundIds = uploadIds.filter((id) => !foundIds.includes(id));
    notFoundIds.forEach((id) => failed.push({ id, reason: 'not found' }));

    // Process deletions in parallel
    await Promise.all(
      uploads.map(async (upload) => {
        try {
          await cloudinary.uploader.destroy(upload.publicId);
          await this.uploadRepo.delete(upload.id);
          successCount++;
        } catch (err: unknown) {
          failed.push({
            id: upload.id,
            reason: err instanceof Error ? err.message : 'delete failed',
          });
        }
      }),
    );

    return { successCount, failed };
  }
}
