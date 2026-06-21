import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseGuards,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'node:path';
import { randomUUID } from 'node:crypto';
import { existsSync, mkdirSync } from 'node:fs';
import { getUploadsDir } from '../../config/uploads-dir.js';
import { ImagesService } from './images.service.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';

const uploadsDir = getUploadsDir();
if (!existsSync(uploadsDir)) {
  mkdirSync(uploadsDir, { recursive: true });
}

@ApiTags('Изображения')
@Controller('api/v1/images')
export class ImagesController {
  constructor(private service: ImagesService) {}

  @Get()
  @ApiOperation({
    summary: 'Список изображений',
    description: 'Публичный доступ',
  })
  @ApiResponse({ status: 200, description: 'Список изображений' })
  async findAll() {
    const images = await this.service.findAll();
    return images.map((img) => ({
      id: img.id,
      filename: img.filename,
      originalName: img.originalName,
      url: `/uploads/${img.filename}`,
      createdAt: img.createdAt,
    }));
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Загрузить изображение',
    description: 'Доступно только администратору',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Файл изображения',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Изображение загружено' })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: uploadsDir,
        filename: (_req, file, cb) => {
          const ext = extname(file.originalname);
          cb(null, `${randomUUID()}${ext}`);
        },
      }),
      limits: { fileSize: 10 * 1024 * 1024 },
    }),
  )
  async create(
    @UploadedFile()
    file: {
      filename: string;
      originalname: string;
      mimetype: string;
      size: number;
    },
  ) {
    if (!file) throw new BadRequestException('File is required');

    const image = await this.service.create({
      filename: file.filename,
      originalName: file.originalname,
    });

    return {
      id: image.id,
      filename: image.filename,
      originalName: image.originalName,
      url: `/uploads/${image.filename}`,
      createdAt: image.createdAt,
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Удалить изображение',
    description: 'Доступно только администратору',
  })
  @ApiResponse({ status: 200, description: 'Изображение удалено' })
  @ApiResponse({ status: 404, description: 'Изображение не найдено' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.service.remove(id);
  }
}
