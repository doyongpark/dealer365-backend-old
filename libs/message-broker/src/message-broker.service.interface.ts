export abstract class IBrokerService {
  abstract closeReceiver(): Promise<void>;
  abstract closeClient(): Promise<void>;
  abstract sendMessage(data: IBrokerMessage): Promise<void>;
  abstract receiveMessage(handler: (message: any) => void): Promise<void>; // 큐 수신을 위한 함수 추가
}

export interface IBrokerMessage {
  correlationId: string;
  messageId: string;
  subject?: string;
  body: {
    type: string;//Lead, Customer, etc
    action: string;//Create, Update, Delete, etc
    id: string;//_id
    data?: any;//CreateLeadDto, UpdateLeadDto, etc
  };
}