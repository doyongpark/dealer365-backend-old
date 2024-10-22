import { BaseDto } from '../shared';
export declare class LeadDto extends BaseDto {
    firstName?: string;
    lastName: string;
    fullName?: string;
    comment?: string;
    leadScore?: number;
    addresses?: string;
    contacts?: string;
    isConvertedToContact?: boolean;
}
