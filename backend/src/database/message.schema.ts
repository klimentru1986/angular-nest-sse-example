import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop()
  userName: string;

  @Prop()
  text: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);