import { MessageBrokerOptions } from "./impl";

export interface MessageBrokerModuleOptions {
  messageBrokerType: string;
  messageBrokerOptions: MessageBrokerOptions
}