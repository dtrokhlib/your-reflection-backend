import { Injectable } from '@nestjs/common';
import { HttpError } from '../modules/HttpError.js';

const entries = [
  {
    id: 1,
    title: 'First entry',
    content: 'Today I started building this project.',
  }
];

@Injectable()
export class EntriesService {
  getEntries() {
    return entries;
  }

  getEntry(id: number) {
    const entry = entries.find((entry) => entry.id === id);
    if (entry) {
      return entry;
    }

    throw new HttpError(`Entry with id ${id} is not found`, 404);
  }
}
