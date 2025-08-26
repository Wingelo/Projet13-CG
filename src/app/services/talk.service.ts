import {Injectable} from '@angular/core';
import Talk from "talkjs";
import {SessionService} from './session.service';
import {User} from "../core/models/user";

@Injectable({
  providedIn: 'root'
})
export class TalkService {

  private currentUser!: Talk.User;

  constructor(private sessionService: SessionService) {
  }

  async createTalkUser(applicationUser: User) {
    await Talk.ready;
    return new Talk.User({
      id: applicationUser.id,
      name: applicationUser.username,
      photoUrl: applicationUser.photoUrl,
      welcomeMessage: applicationUser.welcomeMessage,
      role: applicationUser.role
    });
  }

  async createCurrentSession() {
    await Talk.ready;
    const user = {
      id: this.sessionService.userSession.id,
      username: this.sessionService.userSession.username,
      password: '',
      email: this.sessionService.userSession.email,
      photoUrl: this.sessionService.userSession.photoUrl,
      welcomeMessage: this.sessionService.userSession.welcomeMessage,
      role: this.sessionService.userSession.role
    };
    this.currentUser = await this.createTalkUser(user);
    return new Talk.Session({
      appId: 'tlCSSl7s', me: this.currentUser
    });
  }


  async getOrCreateConversation(session: Talk.Session, otherApplicationUser: any) {
    const otherUser = await this.createTalkUser(otherApplicationUser);
    const conversation = session.getOrCreateConversation(Talk.oneOnOneId(this.currentUser, otherUser));
    conversation.setParticipant(this.currentUser);
    conversation.setParticipant(otherUser);
    return conversation;
  }

  async createInbox(session: Talk.Session) {
    let otherApplicationUser = {
      id: '',
      username: '',
      password: '',
      email: '',
      photoUrl: '',
      welcomeMessage: ''
    };

    const userIndex = (this.sessionService.userSession.id == '0') ? 1 : 0;
    otherApplicationUser = {
      id: this.sessionService.usersSession[userIndex].id,
      username: this.sessionService.usersSession[userIndex].username,
      password: '',
      email: this.sessionService.usersSession[userIndex].email,
      photoUrl: this.sessionService.usersSession[userIndex].photoUrl,
      welcomeMessage: this.sessionService.usersSession[userIndex].welcomeMessage
    };

    const conversation = await this.getOrCreateConversation(session, otherApplicationUser);
    const inbox = session.createInbox();
    inbox.select(conversation);
    return inbox;
  }
}
