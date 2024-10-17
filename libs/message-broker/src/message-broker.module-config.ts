export interface MessageBrokerModuleOptions {
  type: 'azure-service-bus' | 'bull';
  url: string;
  queueName: string;
  isListening?: boolean;
}