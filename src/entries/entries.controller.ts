import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { EntriesService } from './entries.service.js';
import { CreateEntryDto } from './dto/create-entry.dto.js';

@Controller('entries')
export class EntriesController {
  constructor(
    private readonly entriesService: EntriesService) {}

  @Get()
  getEntries() {
    return this.entriesService.getEntries();
  }

  @Get(':id')
  getEntry(@Param('id', ParseIntPipe) id: number) {
    return this.entriesService.getEntry(id);
  }

  @Post()
  createEntry(@Body() dto: CreateEntryDto) {
    return this.entriesService.createEntry(dto);
  }
}
