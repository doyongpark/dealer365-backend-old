export interface IBrokerMessage {
  correlationId: string;
  messageId: string;
  body: {
    _id: string;// ObjectId
    data?: any;//CreateLeadDto, UpdateLeadDto, etc
  };
}