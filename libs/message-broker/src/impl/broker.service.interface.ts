import { IBrokerMessage } from "@dealer365-backend/shared";

export abstract class IBrokerService {
  abstract closeReceiver(): Promise<void>;
  abstract closeClient(): Promise<void>;
  abstract sendMessage(data: IBrokerMessage): Promise<void>;
  abstract receiveMessage(handler: (message: any)  => boolean): Promise<void>; // 큐 수신을 위한 함수 추가
}