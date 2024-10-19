import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * Represents a lead entity in the CRM system.
 * 
 * @deprecated Must remove mongoose dependency
 * 
 * @extends Document
 */
@Schema()
/**@deprecaetd */
export class Lead extends Document {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  fullName: string;

  @Prop()
  comment: string;

  @Prop()
  addresses: string;

  @Prop()
  contacts: string;

  @Prop({ default: false })
  isConvertedToContact: boolean;
}

export const LeadSchema = SchemaFactory.createForClass(Lead);