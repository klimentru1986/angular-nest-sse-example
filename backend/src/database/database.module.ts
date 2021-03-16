import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './message.schema';

const schemas = MongooseModule.forFeature([
    { name: Message.name, schema: MessageSchema }
])

@Module({
    imports: [schemas],
    exports: [schemas]
})
export class DatabaseModule { }