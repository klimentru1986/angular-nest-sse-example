import { Component, OnInit } from '@angular/core';
import { MessageDto } from './dto/message.dto';
import { MessageService } from './services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userName: string;
  text: string;

  constructor(private messageService: MessageService) { }

  messages: MessageDto[] = []

  ngOnInit(): void {
    this.messageService.subscribeToSse().subscribe(res => this.messages = [...this.messages, res])
  }

  addMessage() {
    this.messageService.addMessage({ userName: this.userName, text: this.text }).subscribe()
  }
}
