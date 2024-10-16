export abstract class IQueueService {
  abstract addJob(data: IQueueMessage): Promise<void>;
}

export interface IQueueMessage {
  correlationId: string;
  messageId: string;
  subject?: string;
  body: any;
}