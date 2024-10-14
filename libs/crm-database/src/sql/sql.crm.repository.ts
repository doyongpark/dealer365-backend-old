import { Repository } from 'typeorm';
import { SqlBaseRepository } from './sql.base.repository';

export class SqlCrmRepository extends SqlBaseRepository {
  constructor(repository: Repository<any>) {
    super(repository);
  }
}