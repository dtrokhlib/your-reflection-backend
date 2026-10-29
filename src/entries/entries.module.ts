import { Module } from '@nestjs/common';
import { EntriesController } from './entries.controller.js';
import { EntriesService } from './entries.service.js';
import { DatabaseModule } from '../database/database.module.js';

@Module({
  imports: [DatabaseModule],
  controllers: [EntriesController],
  providers: [EntriesService]
})
export class EntriesModule {}
