import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Lead extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
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