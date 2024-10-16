export interface QueueProviderModuleOptions {
  type: 'azure-service-bus' | 'bull';
  url: string;
  queueName: string;
}