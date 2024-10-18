export interface MessageBrokerModuleOptions {
  type:  string;
  url: string;
  useListener?: boolean;
  queueName: string;
  maxRetries?: number;
  retryInterval?: number;
}