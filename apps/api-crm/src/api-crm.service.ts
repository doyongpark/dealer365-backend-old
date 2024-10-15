import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ApiCrmService {
  constructor() {

  }
  async get() {
    return 'GetCrmDocsQuery...';
  }

  async post() {
    return 'PostCrmDocsCommand...';
  }

  async put() {
    return 'PutCrmDocsCommand...';
  }

  async delete() {
    return 'DeleteCrmDocsCommand...';
  }
}
