import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://sse:sse@cluster0.r9orb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'),
    MessageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
