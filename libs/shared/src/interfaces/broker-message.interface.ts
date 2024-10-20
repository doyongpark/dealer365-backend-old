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