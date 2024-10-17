// bull-queue.service.ts
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { IBrokerMessage, IBrokerService } from '../message-broker.service.interface';

@Injectable()
export class BullBrokerService implements IBrokerService {
  constructor(private readonly queue: Queue, private readonly isListening?: boolean) {}
  sendMessage(data: IBrokerMessage): Promise<void> {
    throw new Error('Method not implemented.');
  }
  receiveMessage(handler: (message: any) => void): Promise<void> {
    throw new Error('Method not implemented.');
  }
}