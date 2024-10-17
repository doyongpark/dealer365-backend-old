export abstract class IQueueService {
  abstract addJob(data: IQueueMessage): Promise<void>;
  abstract receiveMessages(handler: (message: any) => void): Promise<void>; // 큐 수신을 위한 함수 추가
}

export interface IQueueMessage {
  correlationId: string;
  messageId: string;
  subject?: string;
  body: any;
}