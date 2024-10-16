// bull-queue.service.ts
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { IQueueService } from '../queue.service.interface';

@Injectable()
export class BullQueueService implements IQueueService {
  constructor(private readonly queue: Queue) {}

  async addJob(data: any): Promise<void> {
    await this.queue.add(data);
  }
}