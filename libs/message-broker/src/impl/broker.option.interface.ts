export interface MessageBrokerOptions {
  connectionString: string;
  queueName: string;
  useListener?: boolean;
  connectionMaxRetry?: number;
  connectionRetryInterval?: number;
}