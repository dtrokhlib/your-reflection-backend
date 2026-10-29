import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Res } from '@nestjs/common';
import { EntriesService } from './entries.service.js';
import { CreateEntryDto } from './dto/create-entry.dto.js';
import { UpdateEntryDto } from './dto/update-entry.dto.js';

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

  @Patch(':id')
  updateEntry(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateEntryDto,
  ) {
    return this.entriesService.updateEntry(id, dto);
  }

  @Delete(':id')
  async deleteEntry(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: any,
  ) {
    await this.entriesService.deleteEntry(id);
    response.status(204).send();
  }
}
