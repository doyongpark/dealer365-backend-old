import { Schema } from 'mongoose';
import { Lead } from '../../../domains';
export declare const LeadSchema: Schema<Lead, import("mongoose").Model<Lead, any, any, any, import("mongoose").Document<unknown, any, Lead> & Lead & Required<{
    _id: string;
}> & {
    __v?: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Lead, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Lead>> & import("mongoose").FlatRecord<Lead> & Required<{
    _id: string;
}> & {
    __v?: number;
}>;
