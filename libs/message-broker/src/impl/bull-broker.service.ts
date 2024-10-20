// bull-queue.service.ts
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { MessageBrokerModuleOptions } from '../message-broker.option.interface';
import { IBrokerMessage, IBrokerService } from './broker.service.interface';

@Injectable()
export class BullBrokerService implements IBrokerService {
  constructor(
    private readonly options: MessageBrokerModuleOptions,
    private readonly queue: Queue) { }
  closeReceiver(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  closeClient(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  sendMessage(data: IBrokerMessage): Promise<void> {
    throw new Error('Method not implemented.');
  }
  receiveMessage(handler: (message: any) => void): Promise<void> {
    throw new Error('Method not implemented.');
  }
}