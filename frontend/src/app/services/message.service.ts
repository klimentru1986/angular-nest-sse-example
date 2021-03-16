import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageDto } from '../dto/message.dto';
import { fromEvent, Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  addMessage(message: MessageDto) {
    return this.http.post<MessageDto>('/messages', message)
  }

  subscribeToSse(): Observable<MessageDto> {
    return fromEvent<MessageEvent<string>>(new EventSource('/messages/sse'), 'message')
      .pipe(map(res => JSON.parse(res.data)))
  }
}
