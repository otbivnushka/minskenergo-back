import { Module } from '@nestjs/common';
import { AboutSectionsController } from './about-sections.controller.js';
import { AboutSectionsService } from './about-sections.service.js';

@Module({
  controllers: [AboutSectionsController],
  providers: [AboutSectionsService],
})
export class AboutSectionsModule {}
