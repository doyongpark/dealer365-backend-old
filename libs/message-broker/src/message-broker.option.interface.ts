export interface MessageBrokerModuleOptions {
  messageBrokerType: string;
  messageBrokerOptions: MessageBrokerOptions
}

export interface MessageBrokerOptions {
  connectionString: string;
  queueName: string;
  useListener?: boolean;
  connectionMaxRetry?: number;
  connectionRetryInterval?: number;
}