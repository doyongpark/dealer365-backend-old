// bull-queue.service.ts
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { IQueueMessage, IQueueService } from '../queue.service.interface';

@Injectable()
export class BullQueueService implements IQueueService {
  constructor(private readonly queue: Queue) {}
  addJob(data: IQueueMessage): Promise<void> {
    throw new Error('Method not implemented.');
  }
  receiveMessages(handler: (message: any) => void): Promise<void> {
    throw new Error('Method not implemented.');
  }
}