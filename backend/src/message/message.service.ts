import { Injectable, MessageEvent } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ChangeEventCR, ChangeStream } from 'mongodb';
import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import { Message, MessageDocument } from 'src/database/message.schema';
import { MessageDto } from './message.dto';


@Injectable()
export class MessageService {
    private readonly stream: ChangeStream<Message>;

    constructor(@InjectModel(Message.name) private messageModel: Model<MessageDocument>) { 
        this.stream = messageModel.watch();
    }

    async create(m: MessageDto): Promise<Message> {
        console.log(m)
        const create = await this.messageModel.create(m);

        return create.save();
    }

    async getAll(): Promise<Message[]> {
        return await this.messageModel.find();
    }

    sseConnect(): Observable<MessageEvent> {

        return new Observable(handler => {
            this.stream.on('change', (res: ChangeEventCR<Message>) => {
                console.log('change', res)
                handler.next({data: res.fullDocument})
            });

            this.stream.on('error', e => {
                console.log('err', e)
                handler.error(e)
            });
            
            this.stream.on('end', () => {
                console.log('end')
                handler.complete()
            });
            
            this.stream.on('close', () => {
                console.log('close')
                handler.complete()
            });
        })

    }
}