export interface IBrokerMessage {
    correlationId: string;
    messageId: string;
    body: {
        _id: string;
        data?: any;
    };
}
