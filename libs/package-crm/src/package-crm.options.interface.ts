export interface PackageCrmModuleOptions  {
  databaseOptions: {
    type: string;
    connectionString: string;
    useLogging?: boolean;
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