import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

export const DATABASE = Symbol('DATABASE');

export type DatabaseType = ReturnType<typeof drizzle>;

export const databaseProvider = {
  provide: DATABASE,
  useFactory: () => {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString?.trim()) {
      throw new Error('DATABASE_URL must be set in the environment or .env file');
    }

    const pool = new Pool({ connectionString });

    return drizzle({ client: pool });
  },
};
