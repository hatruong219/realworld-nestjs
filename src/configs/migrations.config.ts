import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const connectionSource: DataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME,
  extra: {
    ssl: process.env.DB_USESSL.includes('true'),
  },
  synchronize: false,
  entities: ['dist/api/**/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  migrationsTableName: 'migrations',
});

export default connectionSource;
