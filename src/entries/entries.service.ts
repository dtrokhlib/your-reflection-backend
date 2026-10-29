import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEntryDto } from './dto/create-entry.dto.js';
import { DATABASE } from '../database/database.provider.js';
import { entries } from '../database/schema.js';
import { eq } from 'drizzle-orm';
import type { DatabaseType } from '../database/database.provider.js';
import { UpdateEntryDto } from './dto/update-entry.dto.js';

@Injectable()
export class EntriesService {
  constructor(@Inject(DATABASE) private readonly db: DatabaseType) {}

  getEntries() {
    return this.db.select().from(entries);
  }

  async updateEntry(id: number, body: UpdateEntryDto) {
    return this.db
      .update(entries)
      .set({ ...body })
      .where(eq(entries.id, id))
      .returning();
  }

  async deleteEntry(id: number) {
    return await this.db
      .delete(entries)
      .where(eq(entries.id, id))
  }

  async getEntry(id: number) {
    const [entry] = await this.db
      .select()
      .from(entries)
      .where(eq(entries.id, id))
      .limit(1);

    if (!entry) {
      throw new NotFoundException(`Entry ${id} not found`);
    }

    return entry;
  }

  async createEntry(dto: CreateEntryDto) {
    const [entry] = await this.db
      .insert(entries)
      .values({
        title: dto.title,
        content: dto.content,
      })
      .returning();

    return entry;
  }
}

