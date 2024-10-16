import { BaseEntity } from "@dealer365-backend/shared";

export class LeadEntity extends BaseEntity {
    firstName?: string;
    lastName: string;
    fullName: string;
    comment?: string;
    leadScore?: number;
    addresses?: string;
    contacts?: string;
    isConvertedToContact?: boolean;
}
