import { DataSource } from 'typeorm';

export interface Bootstrap {
  initialize(): Promise<boolean | Error | DataSource>;
  close(): void;
}
