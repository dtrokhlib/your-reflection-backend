import { Injectable } from '@nestjs/common';
import { HttpError } from '../modules/HttpError.js';
import { CreateEntryDto } from './dto/create-entry.dto.js';

type EntryItem = {
  id: number;
  title: string;
  content: string;
}

@Injectable()
export class EntriesService {
  private entries: EntryItem[] = [];

  getEntries() {
    return this.entries;
  }

  getEntry(id: number) {
    const entry = this.entries.find((entry) => entry.id === id);
    if (entry) {
      return entry;
    }

    throw new HttpError(`Entry with id ${id} is not found`, 404);
  }

  createEntry(dto: CreateEntryDto) {
    const entry = {
      id: this.entries.length + 1,
      ...dto,
    };

    this.entries.push(entry);
  }
}
