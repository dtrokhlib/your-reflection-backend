import { Body, Controller, Get, Param, ParseIntPipe, Post, Res } from '@nestjs/common';
import { EntriesService } from './entries.service.js';
import { HttpError } from '../modules/HttpError.js';
import { CreateEntryDto } from './dto/create-entry.dto.js';

type GetByIdParam = {
  id: string;
};

@Controller('entries')
export class EntriesController {
  constructor(private readonly entriesService: EntriesService) {}

  @Get()
  getEntries() {
    return this.entriesService.getEntries();
  }

  @Get(':id')
  getEntry(@Res() response: any, @Param('id', ParseIntPipe) id: number) {
    try {
      const result = this.entriesService.getEntry(id);
      response.status(200).send(result);
    } catch(err: any) {
      response.status(err.status).send(err.message);
    }
  }

  @Post()
  createEntry(@Body() dto: CreateEntryDto) {
    this.entriesService.createEntry(dto);
  }
}
