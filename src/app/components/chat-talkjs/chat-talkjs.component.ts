import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import Talk from "talkjs";
import {TalkService} from "../../services/talk.service";

@Component({
  selector: 'app-chat-talkjs',
  templateUrl: './chat-talkjs.component.html',
  styleUrls: ['./chat-talkjs.component.css']
})
export class ChatTalkjsComponent implements OnInit {
  @ViewChild('talkjsContainer') talkjsContainer!: ElementRef;
  private inbox!: Talk.Inbox;
  private session!: Talk.Session;

  constructor(private talkService: TalkService) {
  }

  ngOnInit() {
    this.createInbox();
  }

  private async createInbox() {
    const session = await this.talkService.createCurrentSession();
    this.inbox = await this.talkService.createInbox(session);
    this.inbox.mount(this.talkjsContainer.nativeElement);
  }
}
