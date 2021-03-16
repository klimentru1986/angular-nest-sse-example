import { Controller, Get, Post, Sse, Body, MessageEvent } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Message } from 'src/database/message.schema';
import { MessageDto } from './message.dto';
import { MessageService } from './message.service';

@Controller('messages')
export class MessageController {

    constructor(private service: MessageService) { }

    @Post()
    async add(@Body() message: MessageDto): Promise<Message> {
        return await this.service.create(message);
    }

    @Get('all')
    getAll(): Promise<Message[]> {
        return this.service.getAll();
    }

    @Sse('sse')
    connectSse(): Observable<MessageEvent> {
        return this.service.sseConnect();
    }
}