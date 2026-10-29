import { NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { EntriesService } from './entries.service.js';
import type { DatabaseType } from '../database/database.provider.js';
import { entries } from '../database/schema.js';

describe('EntriesService.getEntry', () => {
  function setup(rows: unknown[]) {
    const limit = vi.fn().mockResolvedValue(rows);
    const where = vi.fn().mockReturnValue({ limit });
    const from = vi.fn().mockReturnValue({ where });
    const select = vi.fn().mockReturnValue({ from });
    const service = new EntriesService({ select } as unknown as DatabaseType);
    return { service, select, from, where, limit };
  }

  it('executes the query filtered by ID and returns a serializable entry', async () => {
    const entry = {
      id: 42,
      title: 'Entry',
      content: 'Content',
      createdAt: new Date('2026-10-29T00:00:00Z'),
    };
    const { service, select, from, where, limit } = setup([entry]);

    const result = await service.getEntry(42);

    expect(select).toHaveBeenCalledWith();
    expect(from).toHaveBeenCalledWith(entries);
    expect(where).toHaveBeenCalledWith(eq(entries.id, 42));
    expect(limit).toHaveBeenCalledWith(1);
    expect(result).toEqual(entry);
    expect(() => JSON.stringify(result)).not.toThrow();
  });

  it('returns a 404 when the entry does not exist', async () => {
    const { service } = setup([]);

    await expect(service.getEntry(42)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('propagates database failures', async () => {
    const { service, limit } = setup([]);
    const error = new Error('Database unavailable');
    limit.mockRejectedValue(error);

    await expect(service.getEntry(42)).rejects.toBe(error);
  });
});
