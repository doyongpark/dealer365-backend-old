export interface LeadServiceModuleOptions {
  databaseOptions: {
    type: string;
    connectionString: string;
  },
  useMessageBrokerForCommand: boolean;
  messageBrokerOptions?: {
    messageBrokerType: string;
    messageBrokerOptions: {
      connectionString: string;
      queueName: string;
      useListener?: boolean;
      connectionMaxRetry?: number;
      connectionRetryInterval?: number;
    }
  }
}